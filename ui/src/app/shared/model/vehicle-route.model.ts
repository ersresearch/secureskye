import { vehicle } from './protoBundle';

import * as Moment from 'moment';
import * as Long from 'long';


export class Route {
  proto: vehicle.message.IFullGpsRouteProto;
  switchClass: Object;
  checked = false;

  private _switchClassOn: string;
  private _tracking: boolean;
  private _duration: Moment.Duration;
  private _start: Moment.Moment;
  private _stop: Moment.Moment;

  constructor(colorStack: Array<any>, routeProto?: vehicle.message.IFullGpsRouteProto) {
    const self = this;

    self.proto = routeProto;
    self.switchClass = {};
    colorStack.forEach((sw) => {
      self.switchClass[sw] = false;
    });

    // switch class on
    self.switchClassOnCalc();

    const startTimestamp = this.proto.route.start.divide(1000000);
    const stopTimestamp = this.proto.route.stop.divide(1000000);
    const currentTimestamp = Moment().utc().valueOf();

    // start, stop
    this._start = Moment(startTimestamp.toNumber());
    this._stop = Moment(stopTimestamp.toNumber());

    // tracking
    this._tracking = stopTimestamp.gte(currentTimestamp) && !this.proto.route.finished;

    // duration
    this._duration = Moment.duration(this._stop.diff(this._start));
  }

  /**
   * Switch class currently ON
   */
  get switchClassOn(): string {
    return this._switchClassOn;
  }

  /**
   * Route is tracking
   */
  get tracking(): boolean {
    return this._tracking;
  }

  /**
   * Duration of finished route
   */
  get duration(): Moment.Duration {
    return this._duration;
  }

  /**
   * Start time of route
   */
  get start(): Moment.Moment {
    return this._start;
  }

  /**
   * Stop time of route
   */
  get stop(): Moment.Moment {
    return this._stop;
  }

  /**
   * Time of route in string
   */
  get time(): string {
    return this._start.fromNow();
  }

  /**
   * Switch off a route toogle and return color back to stack
   * @param SWITCH_CLASS_STACK switch class stack
   */
  switchOff(SWITCH_CLASS_STACK: Array<any>) {
    for (const sw of Object.keys(this.switchClass)) {
      if (this.switchClass[sw]) {
        SWITCH_CLASS_STACK.unshift(sw);
        this.switchClass[sw] = false;
        break;
      }
    }
    this.switchClassOnCalc();
  }

  /**
 * Switch on a route toogle using color pop from stack
 * @param SWITCH_CLASS_STACK switch class stack
 */
  switchOn(SWITCH_CLASS_STACK: Array<any>) {
    const swCls = SWITCH_CLASS_STACK.shift();
    if (swCls == null) {
      return false;
    }

    this.switchClass[swCls] = true;
    this.switchClassOnCalc();
    return true;
  }

  switchClassOnCalc() {
    for (const sw of Object.keys(this.switchClass)) {
      if (this.switchClass[sw]) {
        this._switchClassOn = sw;
        break;
      }
    }
  }
}
