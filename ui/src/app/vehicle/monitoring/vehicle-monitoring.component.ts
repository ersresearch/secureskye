import { Component, OnInit, OnDestroy } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { AmChart, AmChartsService } from '@amcharts/amcharts3-angular';
import * as Highcharts from 'highcharts';
import * as Moment from 'moment';
import { VehicleService } from '../vehicle.service';
import { ActivatedRoute } from '@angular/router';
import { vehicle } from '../../shared/model/protoBundle';
import { BreadcrumbSwitchLink } from '../../shared/model';
import { BreadcrumbsSwitchService } from '../../shared/service';


@Component({
  selector: 'app-vehicle-monitoring',
  templateUrl: './vehicle-monitoring.component.html',
  styleUrls: ['./vehicle-monitoring.component.scss']
})
export class VehicleMonitoringComponent implements OnInit, OnDestroy {
  /**
   * Number of point to display on chart
   */
  static readonly SPD_MNTOR_CHRT_PNT_DISPLAY = 10;
  /**
   * Speed gauge threshold colors
   */
  static readonly SPEED_GAUGE_THRESHOLDS = {
    normalValue: {
      value: 0,
      class: 'normalValue'
    },
    warningValue: {
      value: 110,
      class: 'warningValue'
    },
    dangerValue: {
      value: 200,
      class: 'dangerValue'
    }
  };
  /**
   * Vehicle UUID
   */
  private vehicleId: string;
  /**
   * Vehicle data refresh interval (in ms)
   */
  readonly DATA_REFRESH_INTERVAL = 2000;
  /**
   * Speed monitoring chart
   */
  speedMonitoringChart: Chart;
  /**
   * Speed gauge chart value
   */
  speedGaugeValue = 0;
  /**
   * Speed gauge chart value class
   */
  speedGaugeValueClass = 'normalValue';
  /**
   * Speed gauge animation duration
   */
  speedGaugeAnimationDuration = 0.8;
  /**
   * Odometer value
   */
  odometerValue = 0;
  /**
   * Odometer configurations
   */
  odometerConfig = {
    format: '(dddddd)',
    theme: 'minimal',
    duration: 0.8
  };
  /**
   * Vehicle GPS coordinates lngitude
   */
  gpsLongitude: number;
  /**
   * Vehicle GPS coordinates latitude
   */
  gpsLatitude: number;
  /**
   * Vehicle GPS last updated time
   */
  gpsLastUpdated = '';
  /**
   * Vehicle data refresh timer
   */
  private dataRefreshTimer: any;
  /**
   * MIL status value
   */
  mil: vehicle.message.IMilStatusEventProto;
  /**
   * Fuel Gauge
   */
  private fuelGauge: AmChart;
  /**
   * wheel front left class
   */
  wheelSpeedValueFLClass = 'normalValue';
  /**
   * wheel front right class
   */
  wheelSpeedValueFRClass = 'normalValue';
  /**
   * wheel rear left class
   */
  wheelSpeedValueRLClass = 'normalValue';
  /**
   * wheel rear right class
   */
  wheelSpeedValueRRClass = 'normalValue';
  /**
   * wheel front left speed
   */
  frontLeftSpeed = 0;
  /**
   * wheel front right speed
   */
  frontRightSpeed = 0;
  /**
   * wheel rear left speed
   */
  rearLeftSpeed = 0;
  /**
   * wheel rear right speed
   */
  rearRightSpeed = 0;
  batteryLevel = 0;
  batteryInterval;
  /**
   * Gear shift position
   */
  gearPosition = '0';

  /**
   * Engine Load Value
   */
  engineLoad = 0;
  /**
   * Engine Load Gauge
   */
  private engineLoadGauge: AmChart;
  /**
   * Engine coolant value
   */
  engineCoolant = 0;
  /**
   * Engine coolant gauge
   */
  private engineCoolGauge: AmChart;
  /**
   * Engine runtime value
   */
  engineRuntime: Moment.Duration;
  /**
   * Engine runtime odometer config
   */
  runtimeConfig = {
    animation: 'slide',
    format: '(dd)',
    theme: 'default',
    duration: 0.5
  };
  /**
   * RPM value
   */
  rpm = 0;
  /**
   * RPM gauge
   */
  private rpmGauge: AmChart;
  /**
   * Intake air value
   */
  intakeAir = 0;
  /**
   * Intake air gauge
   */
  private intakeAirGauge: AmChart;
  /**
   * Mass air flow value
   */
  massAir = 0;
  /**
   * Mass air flow gauge
   */
  private massGauge: AmChart;
  /**
   * Throttle value
   */
  throttle = 0;
  /**
   * Throttle gauge
   */
  private throttleGauge: AmChart;

  constructor(
    private AmCharts: AmChartsService,
    private vehicleService: VehicleService,
    private route: ActivatedRoute,
    private breadcrumbsSwitchService: BreadcrumbsSwitchService
  ) { }

  ngOnInit() {
    const self = this;

    // HighChartJS global config
    Highcharts.setOptions({
      global: {
        useUTC: false
      },
      credits: {
        enabled: false
      }
    });

    // Initialize HighChartJS
    self.speedMonitoringChart = new Chart({
      chart: {
        type: 'line',
      },
      title: {
        text: null
      },
      xAxis: {
        type: 'datetime'
      },
      yAxis: {
        title: {
          text: null
        },
        plotLines: [{
          value: 0,
          width: 1,
          color: '#808080'
        }],
        max: 300
      },
      tooltip: {
        formatter: function () {
          return Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/><b>' +
            Highcharts.numberFormat(this.y, 0, '', '') + '</b> km/h';
        }
      },
      legend: {
        enabled: false
      },
      exporting: {
        enabled: false
      },
      plotOptions: {
        series: {
          marker: {
            enabled: false
          }
        }
      },
      series: [{
        name: 'Speed',
        data: []
      }]
    });

    // init gauges
    self.fuelGauge = self.initFuelGauge();
    self.engineLoadGauge = self.initPercentGauge('loadGauge');
    self.throttleGauge = self.initPercentGauge('throttleGauge');
    self.engineCoolGauge = self.initClockGauge('coolGauge', 25, -50, 300, 150);
    self.intakeAirGauge = self.initClockGauge('airGauge', 25, -50, 300, 150);
    self.rpmGauge = self.initClockGauge('rpmGauge', 1000, 0, 17000, 6000);
    self.massGauge = self.initClockGauge('massGauge', 50, 0, 700, 250);

    // Retrieve vehicle UUID from parameters
    self.route.params.subscribe((params) => {
      self.vehicleId = params.vehicleId;

      // breadcrumbs switch links
      self.breadcrumbsSwitchService.breadcrumbSwitchLinks(
        BreadcrumbSwitchLink.create('GPS History', false, 'fa fa-location-arrow', ['/vehicle', self.vehicleId, 'route'])
      );
      // Start refresh data from server periodically
      self.refreshData();
    });
  }

  ngOnDestroy() {
    const self = this;
    // Destroy gauges
    self.destroyGauge(self.fuelGauge);
    self.destroyGauge(self.engineLoadGauge);
    self.destroyGauge(self.throttleGauge);
    self.destroyGauge(self.engineCoolGauge);
    self.destroyGauge(self.intakeAirGauge);
    self.destroyGauge(self.rpmGauge);
    self.destroyGauge(self.massGauge);
    clearTimeout(this.dataRefreshTimer);
  }

  /**
   * Refresh data from server. After success, pause for 'DATA_REFRESH_INTERVAL' ms then refresh.
   */
  refreshData() {
    const self = this;
    clearTimeout(self.dataRefreshTimer);

    self.vehicleService.getEventMessages(self.vehicleId, 1).subscribe((evtMsg: vehicle.message.EventBatchProto) => {
      // Update GPS coordinates
      if (evtMsg.gps && evtMsg.gps.length > 0) {
        const latestGps = evtMsg.gps.reduce((a, b) => a.timestamp.gt(b.timestamp) ? a : b);
        self.gpsLatitude = latestGps.latitude;
        self.gpsLongitude = latestGps.longitude;
        self.gpsLastUpdated = Moment(latestGps.timestamp.div(1000000).toNumber()).fromNow();
      }

      // Update odometer
      if (evtMsg.odometer && evtMsg.odometer.length > 0) {
        const latestOdometer = evtMsg.odometer.reduce((a, b) => a.timestamp.gt(b.timestamp) ? a : b);
        self.odometerValue = latestOdometer.value.toNumber();
      }

      // Update Speed
      if (evtMsg.obd2 && evtMsg.obd2.speed && evtMsg.obd2.speed.length > 0) {
        // Gauge
        const latestSpeed = evtMsg.obd2.speed.reduce((a, b) => a.timestamp.gt(b.timestamp) ? a : b);
        self.speedGaugeValue = latestSpeed.kmh;

        if (self.speedGaugeValue < VehicleMonitoringComponent.SPEED_GAUGE_THRESHOLDS.warningValue.value) {
          self.speedGaugeValueClass = VehicleMonitoringComponent.SPEED_GAUGE_THRESHOLDS.normalValue.class;
        } else {
          if (self.speedGaugeValue < VehicleMonitoringComponent.SPEED_GAUGE_THRESHOLDS.dangerValue.value) {
            self.speedGaugeValueClass = VehicleMonitoringComponent.SPEED_GAUGE_THRESHOLDS.warningValue.class;
          } else {
            self.speedGaugeValueClass = VehicleMonitoringComponent.SPEED_GAUGE_THRESHOLDS.dangerValue.class;
          }
        }

        // Monitoring chart
        const x = latestSpeed.timestamp.div(1000000).toNumber();
        const y = latestSpeed.kmh;
        self.speedMonitoringChart.addPoint([x, y], 0,
          true,
          self.speedMonitoringChart.ref.series[0].data.length > VehicleMonitoringComponent.SPD_MNTOR_CHRT_PNT_DISPLAY);
      }

      //update wheel speed
      if (evtMsg.wheelSpeed && evtMsg.wheelSpeed.length > 0) {
        const latesWheel = evtMsg.wheelSpeed.reduce((a, b) => a.timestamp.gt(b.timestamp) ? a : b);
        self.frontLeftSpeed = latesWheel.frontLeft;
        self.frontRightSpeed = latesWheel.frontRight;
        self.rearLeftSpeed = latesWheel.rearLeft;
        self.rearRightSpeed = latesWheel.rearRight;
        // Update wheel speed class
        self.updateWheelSpeedClass();
      }

      //update gear position
      if (evtMsg.gearShift && evtMsg.gearShift.length > 0) {
        const latesGear = evtMsg.gearShift.reduce((a, b) => a.timestamp.gt(b.timestamp) ? a : b);
        self.gearPosition =
          (latesGear.gear === 0) ? 'N' :
            (latesGear.gear === 5) ? 'P' :
              (latesGear.gear === 6) ? 'F' :
                latesGear.gear.toString();
      }

      // Update MIL status
      if (evtMsg.obd2 && evtMsg.obd2.milStatus && evtMsg.obd2.milStatus.length > 0) {
        const latestMil = evtMsg.obd2.milStatus.reduce((a, b) => a.timestamp.gt(b.timestamp) ? a : b);
        self.mil = latestMil;
      }

      // Update Engine Monitor
      // Update Engine Load
      if (evtMsg.obd2 && evtMsg.obd2.engineLoad && evtMsg.obd2.engineLoad.length > 0) {
        const latestLoad = evtMsg.obd2.engineLoad.reduce((a, b) => a.timestamp.gt(b.timestamp) ? a : b);
        self.engineLoad = latestLoad.value;
      }
      // Update Engine Coolant
      if (evtMsg.obd2 && evtMsg.obd2.engineCoolant && evtMsg.obd2.engineCoolant.length > 0) {
        const latestCool = evtMsg.obd2.engineCoolant.reduce((a, b) => a.timestamp.gt(b.timestamp) ? a : b);
        self.engineCoolant = latestCool.temperature;
      }
      // Update Engine Runtime
      if (evtMsg.obd2 && evtMsg.obd2.engineRuntime && evtMsg.obd2.engineRuntime.length > 0) {
        const latestRunt = evtMsg.obd2.engineRuntime.reduce((a, b) => a.timestamp.gt(b.timestamp) ? a : b);
        self.engineRuntime = Moment.duration(latestRunt.seconds, 'seconds');
      }
      // Update RPM
      if (evtMsg.obd2 && evtMsg.obd2.rpm && evtMsg.obd2.rpm.length > 0) {
        const latesRpm = evtMsg.obd2.rpm.reduce((a, b) => a.timestamp.gt(b.timestamp) ? a : b);
        self.rpm = latesRpm.value;
      }
      // Update Intake Air
      if (evtMsg.obd2 && evtMsg.obd2.intakeAir && evtMsg.obd2.intakeAir.length > 0) {
        const latestInAir = evtMsg.obd2.intakeAir.reduce((a, b) => a.timestamp.gt(b.timestamp) ? a : b);
        self.intakeAir = latestInAir.temperature;
      }
      // Update Mass Air Flow
      if (evtMsg.obd2 && evtMsg.obd2.massAirFlow && evtMsg.obd2.massAirFlow.length > 0) {
        const latestMassAir = evtMsg.obd2.massAirFlow.reduce((a, b) => a.timestamp.gt(b.timestamp) ? a : b);
        self.massAir = Math.round(latestMassAir.rate);
      }
      // Update Throttle
      if (evtMsg.obd2 && evtMsg.obd2.throttle && evtMsg.obd2.throttle.length > 0) {
        const latestThrollte = evtMsg.obd2.throttle.reduce((a, b) => a.timestamp.gt(b.timestamp) ? a : b);
        self.throttle = latestThrollte.value;
      }

      // Update gauges value
      self.updatePercentGauge(self.engineLoadGauge, self.engineLoad);
      self.updatePercentGauge(self.throttleGauge, self.throttle);
      self.updateClockGauge(self.engineCoolGauge, self.engineCoolant, ' °C');
      self.updateClockGauge(self.intakeAirGauge, self.intakeAir, ' °C');
      self.updateClockGauge(self.rpmGauge, self.rpm, ' RPM');
      self.updateClockGauge(self.massGauge, self.massAir, ' Gram/s');

      // Temopary random data for UI
      self.randomFuelGauge();
      self.randomBattery();

      // Refresh after 'DATA_REFRESH_INTERVAL' ms
      self.dataRefreshTimer = setTimeout(() => self.refreshData(), self.DATA_REFRESH_INTERVAL);
    }, (err) => clearTimeout(self.dataRefreshTimer));
  }

  /**
   * Convert Speed value to string for display.
   * @param value Speed value
   */
  gaugeLabel(value: number): string {
    return String(Math.round(value));
  }

  /**
   * Update wheel speed class
   */
  updateWheelSpeedClass() {
    const self = this;
    // update front - left class
    self.wheelSpeedValueFLClass = self.getWheelSpeedClass(self.frontLeftSpeed);
    // update front - right class
    self.wheelSpeedValueFRClass = self.getWheelSpeedClass(self.frontRightSpeed);
    // update rear - left class
    self.wheelSpeedValueRLClass = self.getWheelSpeedClass(self.rearLeftSpeed);
    // update rear - right class
    self.wheelSpeedValueRRClass = self.getWheelSpeedClass(self.rearRightSpeed);
  }

  /**
   * Get class by wheel speed
   *
   * @param speed speed value
   */
  getWheelSpeedClass(speed: number): string {
    if (speed < VehicleMonitoringComponent.SPEED_GAUGE_THRESHOLDS.warningValue.value) {
      return VehicleMonitoringComponent.SPEED_GAUGE_THRESHOLDS.normalValue.class;
    } else {
      if (speed < VehicleMonitoringComponent.SPEED_GAUGE_THRESHOLDS.dangerValue.value) {
        return VehicleMonitoringComponent.SPEED_GAUGE_THRESHOLDS.warningValue.class;
      } else {
        return VehicleMonitoringComponent.SPEED_GAUGE_THRESHOLDS.dangerValue.class;
      }
    }
  }

  /**
   * Random battery value
   */
  randomBattery() {
    const self = this;
    const newBattery = Math.floor((Math.random() * 100) + 1);
    self.updateBattery(self.batteryLevel, newBattery);
  }

  /**
   * Update battery with animation
   * @param oldValue old battery value
   * @param newValue new battery value
   */
  updateBattery(oldValue: number, newValue: number) {
    const self = this;
    // clear old interval
    clearInterval(self.batteryInterval);
    // calculate duration
    const duration = (self.DATA_REFRESH_INTERVAL / 2) / Math.abs(oldValue - newValue);

    self.batteryInterval = setInterval(
      function () {
        if (self.batteryLevel > newValue) {
          self.batteryLevel--;
        } else if (self.batteryLevel < newValue) {
          self.batteryLevel++;
        } else {
          clearInterval(self.batteryInterval);
        }
      }.bind(self)
      , duration);
  }

  /**
   * Update fuel gauge random value
   */
  randomFuelGauge() {
    const value = Math.round(Math.random() * 100);
    if (this.fuelGauge) {
      if (this.fuelGauge.arrows) {
        if (this.fuelGauge.arrows[0]) {
          if (this.fuelGauge.arrows[0].setValue) {
            this.AmCharts.updateChart(this.fuelGauge, () => {
              // Change whatever properties you want
              let bandColor = '3cd3a3';
              if (value < 20) {
                bandColor = 'ff0000';
              }
              this.fuelGauge.axes[0].bands[1].color = bandColor;
              this.fuelGauge.arrows[0].setValue(value);
              this.fuelGauge.axes[0].setTopText(value + ' MPG');
              // adjust darker band to new value
              this.fuelGauge.axes[0].bands[1].setEndValue(value);
            });
          }
        }
      }
    }
  }

  /**
   * Resolve status class for variable.
   */
  statusAvailable(value: boolean = null) {
    return {
      'badge-secondary': value === null, // undefined value will be default to null
      'badge-success': value === true,
      'badge-warning': value === false
    };
  }
  statusComplete(value: boolean = null) {
    return {
      'badge-secondary': value === null, // undefined value will be default to null
      'badge-success': value === false,
      'badge-warning': value === true
    };
  }
  /**
  * Resolve status text for variable.
  */
  textAvailable(value: boolean = null) {
    return (value === true) ? 'Available' : (value === false) ? 'Unavailable' : 'Unknown';
  }
  textComplete(value: boolean = null) {
    return (value === true) ? 'Incomplete' : (value === false) ? 'Complete' : 'Unknown';
  }

  initFuelGauge() {
    return this.AmCharts.makeChart('fuelGauge', {
      type: 'gauge',
      theme: 'light',
      hideCredits: true,
      axes: [{
        axisThickness: 1,
        axisAlpha: 0.2,
        tickAlpha: 0.2,
        unit: '%',
        valueInterval: 25,
        labelFunction: (value) => {
          if (value === 0) {
            return 'E';
          } else if (value === 25) {
            return '25%'
          } else if (value === 50) {
            return '50%';
          } else if (value === 75) {
            return '75%';
          } else if (value === 100) {
            return 'F';
          } else {
            return '';
          }
        },
        bands: [{
          color: '#cc4748',
          startValue: 0,
          endValue: 3
        }, {
          color: '#fdd400',
          startValue: 3,
          endValue: 8
        }, {
          color: '#84b761',
          startValue: 8,
          endValue: 100,
          innerRadius: '100%'
        }],
        bottomText: 'Fuel Level',
        bottomTextFontSize: 14,
        endValue: 100
      }],
      arrows: [{
        alpha: 0.5,
        borderAlpha: 0,
      }]
    });
  }

  /**
   * Init percentage gauge: Fuel gauge, Engine Load gauge, Throttle Gauge
   * @param name gauge name
   */
  initPercentGauge(name: string) {
    return this.AmCharts.makeChart(name, {
      'type': 'gauge',
      'hideCredits': true,
      'theme': 'light',
      'axes': [{
        'topTextFontSize': 14,
        'topTextYOffset': 70,
        'axisColor': '#31d6ea',
        'axisThickness': 1,
        'endValue': 100,
        'gridInside': true,
        'inside': true,
        'valueInterval': 25,
        'tickColor': '#67b7dc',
        'startAngle': -90,
        'endAngle': 90,
        'bandOutlineAlpha': 0,
        'bands': [{
          'color': '#0080ff',
          'endValue': 100,
          'gradientRatio': [0.5, 0, -0.5],
          'startValue': 0
        }, {
          'color': '#3cd3a3',
          'endValue': 0,
          'gradientRatio': [0.5, 0, -0.5],
          'startValue': 0
        }]
      }],
      'arrows': [{
        'nailRadius': 0,
        alpha: 0.5,
        borderAlpha: 0,
      }],
      'export': {
        'enabled': true
      }
    });
  }
  /**
   * Update percentage gauge value
   * @param gauge 
   * @param value 
   */
  updatePercentGauge(gauge: AmChart, value: number) {
    const self = this;
    if (gauge) {
      if (gauge.arrows) {
        if (gauge.arrows[0]) {
          if (gauge.arrows[0].setValue) {
            this.AmCharts.updateChart(gauge, () => {
              let bandColor = '3cd3a3';
              if (value < 20) {
                bandColor = 'ff0000';
              }
              //change color of the second band (moving band)
              gauge.axes[0].bands[1].color = bandColor;
              //change value of the arrow
              gauge.arrows[0].setValue(value);
              //change top text of the gauge
              gauge.axes[0].setTopText(value + ' %');
              //change end value of the second band to same value of the arrow
              gauge.axes[0].bands[1].setEndValue(value);
            })
          }
        }
      }
    }
  }

  /**
   * Init other gauge: EngineCoolant, InTakeAir, RPM, MassAirFlow 
   * The gauge has 3 bands: Green, Yellow, Red, the @param jump is to set the length of each band
   * @param name gauge name
   * @param interval value of the inside tick of the gauge
   * @param start min value
   * @param end max value
   * @param jump 
   */
  initClockGauge(name: string, interval: number, start: number, end: number, jump: number) {
    return this.AmCharts.makeChart(name, {
      'hideCredits': true,
      'type': 'gauge',
      'theme': 'light',
      'axes': [{
        'axisThickness': 1,
        'axisAlpha': 0.2,
        'tickAlpha': 0.2,
        'valueInterval': interval,
        'bands': [{
          'color': '#84b761',
          'startValue': start,
          'endValue': start + jump
        }, {
          'color': '#fdd400',
          'startValue': start + jump,
          'endValue': start + jump * 2
        }, {
          'color': '#cc4748',
          'startValue': start + jump * 2,
          'endValue': end
        }],
        'bottomTextFontSize': 17,
        'bottomTextYOffset': -20,
        'startValue': start,
        'endValue': end
      }],
      'arrows': [{
        alpha: 0.5,
        borderAlpha: 0,
      }],
      'export': {
        'enabled': true
      }
    });
  }
  /**
   * Update value of the gauge
   * @param gauge 
   * @param value 
   * @param text unit of value in the gauge
   */
  updateClockGauge(gauge: AmChart, value: number, text: string) {
    const self = this;
    if (gauge) {
      if (gauge.arrows) {
        if (gauge.arrows[0]) {
          if (gauge.arrows[0].setValue) {
            self.AmCharts.updateChart(gauge, () => {
              //change arrow value
              gauge.arrows[0].setValue(value);
              //change bottom text of the gauge
              gauge.axes[0].setBottomText(value + text);
            })
          }
        }
      }
    }
  }
  /**
   * Destroy gauge
   * @param gauge 
   */
  destroyGauge(gauge: AmChart) {
    if (gauge) {
      this.AmCharts.destroyChart(gauge);
    }
  }
}
