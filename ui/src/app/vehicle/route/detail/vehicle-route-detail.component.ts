import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Route, vehicle } from '../../../shared/model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { VehicleService } from '../../vehicle.service';
import { GlobalDialogService } from '../../../shared/service';
import * as Moment from 'moment';

@Component({
  selector: 'app-vehicle-route-detail',
  templateUrl: './vehicle-route-detail.component.html',
  styleUrls: ['./vehicle-route-detail.component.scss']
})
export class VehicleRouteDetailComponent implements OnInit, OnDestroy {

  private routeId: string;
  /**
   * GPS route data
   */
  routeData: Route;
  /**
   * Route name for updating
   */
  routeForm: FormGroup;
  /**
   * Frequently updated duration of on going route
   */
  durationTracking: string;
  /**
   * Timer for updating duration of on going route
   */
  private durationTrackingTimer: any;
  /**
   * Latest gps event message
   */
  lastGps: vehicle.message.IGpsEventProto;
  /**
   * Route gps events
   */
  gps: vehicle.message.IGpsEventProto[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private vehicleService: VehicleService,
    private fb: FormBuilder,
    private globalDialogService: GlobalDialogService
  ) { }

  ngOnInit() {
    const self = this;

    self.route.params.subscribe((params) => {
      self.routeId = params.routeId;

      self.gpsTracking();
    });
  }

  ngOnDestroy() {
    clearTimeout(this.durationTrackingTimer);
  }

  /**
   * Load route data
   * @param trackingGpsOnly update gps events only if route is being tracked
   */
  gpsTracking(trackingGpsOnly: boolean = false) {
    const self = this;

    self.vehicleService.getVehicleRouteData(self.routeId).subscribe((v) => {
      self.routeData = new Route(['switch-primary'], v);
      if (trackingGpsOnly) {
        if (self.routeData.proto.events.length > 0) {
          const newEvents = self.routeData.proto.events.filter((e) => e.timestamp.gt(self.lastGps.timestamp))
            .sort((a, b) => a.timestamp.comp(b.timestamp));
          self.gps.push(...newEvents);
        }
      } else {
        if (self.routeData.proto.events.length > 0) {
          const events = self.routeData.proto.events.sort((a, b) => a.timestamp.comp(b.timestamp));
          self.gps = events;
        }

        // Create form
        self.routeForm = self.fb.group({
          routeName: [self.routeData.proto.route.name, [Validators.required]],
        });
      }

      // Set latest gps event
      self.lastGps = self.gps[self.gps.length - 1];

      const duration = Moment.duration(Moment().diff(self.routeData.start));
      self.durationTracking = Moment.utc(duration.asMilliseconds()).format('HH:mm:ss');

      // If route is tracking reload gps after 1sec
      if (self.routeData.tracking) {
        self.durationTrackingTimer = setTimeout(() => {
          self.gpsTracking(true);
        }, 1000);
      }
    });
  }

  /**
   * Save route name on edit mode
   */
  saveRouteName() {
    const self = this;

    if (self.routeForm.dirty) {
      if (self.routeForm.invalid) {
        Object.keys(self.routeForm.controls).forEach(field => self.routeForm.get(field).markAsTouched({ onlySelf: true }));
        return;
      }

      const routeName = self.routeForm.get('routeName').value;
      self.vehicleService.renameVehicleRoute(self.routeData.proto.route.id, routeName).subscribe(() => self.returnRouteList(), (err) => {
        self.globalDialogService.error(err);
      });
    }
  }

  /**
   * Remove route on edit mode
   */
  removeRoute() {
    const self = this;

    self.vehicleService.deleteVehicleRoute(self.routeData.proto.route.id).subscribe(() => self.returnRouteList(), (err) => {
      self.globalDialogService.error(err);
    });
  }

  /**
   * Finish current route
   */
  finishRoute() {
    const self = this;

    clearTimeout(this.durationTrackingTimer);
    self.vehicleService.finishVehicleRoute(self.routeData.proto.route.id).subscribe(() => self.gpsTracking(), (err) => {
      self.globalDialogService.error(err);
    });
  }

  /**
   * Navigate back to vehicle list
   */
  private returnRouteList(): Promise<boolean> {
    return this.router.navigate(['..'], { relativeTo: this.route.parent, replaceUrl: true });
  }

  /**
 * Show confirm dialog
 */
  showConfirmDialog() {
    const self = this;

    // Ask for confirmation.
    self.globalDialogService.delete(`route ${self.routeData.proto.route.name}`).subscribe((agreed) => {
      if (agreed) {
        // Agreed to remove
        self.removeRoute();
      }
    });
  }


  /**
   * Form field validation classes.
   * @param field field name.
   */
  fieldValidationClass(field: string) {
    return {
      'is-invalid': this.routeForm.get(field).invalid && (this.routeForm.get(field).dirty || this.routeForm.get(field).touched),
      'is-valid': this.routeForm.get(field).valid && this.routeForm.get(field).dirty
    };
  }

  /**
   * Form field validation error check.
   * @param field fild name.
   * @param error error type.
   */
  fieldValidationError(field: string, error: string) {
    return this.routeForm.get(field).errors && this.routeForm.get(field).errors[error];
  }
}
