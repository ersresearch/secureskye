import { Component, OnInit, OnDestroy } from '@angular/core';
import { Route, vehicle, GPSLine, BreadcrumbSwitchLink } from 'app/shared/model';
import { Router, ActivatedRoute } from '@angular/router';
import { VehicleService } from '../../vehicle.service';
import { BreadcrumbsSwitchService } from '../../../shared/service';

@Component({
  selector: 'app-vehicle-route-list',
  templateUrl: './vehicle-route-list.component.html',
  styleUrls: ['./vehicle-route-list.component.scss']
})
export class VehicleRouteListComponent implements OnInit, OnDestroy {
  /**
   * Route tooggle class stack's colors.
   */
  static readonly SWITCH_CLASS_COLOR = {
    'switch-primary': '#20a8d8',
    'switch-secondary': '#a4b7c1',
    'switch-success': '#4dbd74',
    'switch-warning': '#ffc107',
    'switch-info': '#63c2de',
    'switch-danger': '#f86c6b',
  };
  /**
   * Vehicle GPS refresh interval (in ms).
   */
  static readonly GMAP_REFRESH_INTERVAL = 300000;
  /**
   * Route tooggle class stack (from bootstrap).
   */
  private readonly SWITCH_CLASS_STACK = [
    'switch-primary',
    'switch-secondary',
    'switch-success',
    'switch-warning',
    'switch-info',
    'switch-danger',
  ];
  /**
   * Vehicle UUID.
   */
  private vehicleId: string;
  /**
   * Vechile routes.
   */
  routesData: Route[];
  /**
   * Vehicle localtion map coordinates lngitude.
   */
  gMapLongitude: number;
  /**
   * Vehicle localtion map coordinates latitude.
   */
  gMapLatitude: number;
  /**
   * Vehicle GPS coordinates lngitude.
   */
  gpsLongitude: number;
  /**
   * Vehicle GPS coordinates latitude.
   */
  gpsLatitude: number;
  /**
   * Vehicle gps refresh timer.
   */
  gMapRefreshTimer: any;
  /**
   * Name for new route tracking.
   */
  routeName = '';
  /**
   * Modal ID.
   */
  modalId = 'route_detail_modal';
  /**
   * Route list current page number (pagination).
   */
  routeListPageNo = 1;
  /**
   * Number of items per page.
   */
  itemsPerPage = 5;
  /**
   * Route list to draw gps line.
   */
  routeList = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private vehicleService: VehicleService,
    private breadcrumbsSwitchService: BreadcrumbsSwitchService
  ) { }

  ngOnInit() {
    const self = this;

    // Retrieve vehicle UUID from parameters
    self.route.params.subscribe((params) => {
      self.vehicleId = params.vehicleId;

      // breadcrumbs switch links
      self.breadcrumbsSwitchService.breadcrumbSwitchLinks(
        BreadcrumbSwitchLink.create('Monitoring', false, 'fa fa-tachometer', ['/vehicle', self.vehicleId, 'monitoring']),
      );
      // Load routes
      self.listRoutes();

      // Start refresh data from server periodically
      self.refreshGMap();
    });
  }

  ngOnDestroy() {
    clearTimeout(this.gMapRefreshTimer);
  }

  /**
   * Refresh gmap location (no marker)
   */
  private refreshGMap() {
    const self = this;

    self.vehicleService.getEventMessages(self.vehicleId, 1).subscribe((evtMsg: vehicle.message.EventBatchProto) => {
      // Update GPS coordinates
      if (evtMsg.gps && evtMsg.gps.length > 0) {
        const latestGps = evtMsg.gps.reduce((a, b) => a.timestamp.gt(b.timestamp) ? a : b);
        self.gMapLatitude = latestGps.latitude;
        self.gMapLongitude = latestGps.longitude;
      }

      // Refresh after 'DATA_REFRESH_INTERVAL' ms
      self.gMapRefreshTimer = setTimeout(() => self.refreshGMap(), VehicleRouteListComponent.GMAP_REFRESH_INTERVAL);
    },
      (err) => clearTimeout(self.gMapRefreshTimer));
  }

  /**
   * Toogle a route on/off in map
   * @param route target
   * @param routeIndex target index
   */
  routeToggle(route: Route, toggle?: boolean) {
    if (toggle === true || toggle === false) {
      route.checked = toggle;
    }
    if (route.checked) {
      if (route.switchOn(this.SWITCH_CLASS_STACK)) {
        this.drawRoute(route, VehicleRouteListComponent.SWITCH_CLASS_COLOR[route.switchClassOn]);
      } else {
        // No color available, toggle off route
        setTimeout(() => route.checked = false);
      }
    } else {
      this.clearRoute(route);
      route.switchOff(this.SWITCH_CLASS_STACK);
    }
  }

  /**
   * Draw route on map
   *
   * @param route target
   * @param routeIndex target index
   * @param color color
   */
  drawRoute(route: Route, color: string) {
    const self = this;
    // Request gps data from server
    self.vehicleService.getVehicleRouteData(route.proto.route.id).subscribe((routeData) => {
      // add gps line
      const newRoute = new GPSLine(color, routeData.events);
      self.routeList.push(newRoute);
      // update map
      if (routeData.events.length > 0) {
        self.gMapLongitude = routeData.events[0].longitude;
        self.gMapLatitude = routeData.events[0].latitude;
      }
    }, (err) => {
      // Cannot retrieve route data, toggle off route
      setTimeout(() => self.routeToggle(route, false));
    });
  }

  /**
   * Clear route data
   * @param route target
   * @param routeIndex target index
   */
  clearRoute(route: Route) {
    // TODO: clear route
    this.routeList.forEach((r, i) => {
      if (r.color === VehicleRouteListComponent.SWITCH_CLASS_COLOR[route.switchClassOn]) {
        this.routeList.splice(i, 1);
      }
    });
  }

  /**
   * List all routes of vehicle
   */
  listRoutes() {
    const self = this;

    self.vehicleService.getVehicleRoutes(self.vehicleId).subscribe((routesData) => {
      // reset paging
      self.routeListPageNo = 1;
      // reset color stack
      if (self.routesData) {
        self.routesData.forEach((r, index) => {
          self.clearRoute(r);
          r.switchOff(this.SWITCH_CLASS_STACK);
        });
      }
      self.routesData = [];

      const sortedRoutesData = routesData.data.sort((a, b) => b.start.comp(a.start));
      sortedRoutesData.forEach((r) => self.routesData.push(new Route(self.SWITCH_CLASS_STACK,
        vehicle.message.FullGpsRouteProto.create({ route: r })))
      );
    });
  }

  /**
   * Start new route tracking
   */
  trackingStart() {
    const self = this;

    self.vehicleService.createVehicleRoute(self.vehicleId, self.routeName).subscribe(() => {
      self.routeName = '';
      self.listRoutes();
    });
  }

  /**
   * Finish tracking a route
   * @param route target
   */
  trackingStop(route: Route) {
    const self = this;

    // const payload = vehicle.message.GpsRouteProto.toObject(route.routeProto as vehicle.message.GpsRouteProto);
    self.vehicleService.finishVehicleRoute(route.proto.route.id).subscribe(() => self.listRoutes());
  }

  /**
   * Open modal of route details
   * @param route target
   */
  viewDetail(route: Route) {
    const self = this;
    self.router.navigate([route.proto.route.id, 'detail'], { relativeTo: self.route, replaceUrl: true });
  }

}
