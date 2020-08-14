import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { vehicle } from '../shared/model';
import * as Long from 'long';
import { Router, ActivatedRoute } from '@angular/router';
import { VehicleService } from '../vehicle/vehicle.service';
import { PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';

@Component({
  selector: 'app-can-message',
  templateUrl: './can-message.component.html',
  styleUrls: ['./can-message.component.scss']
})
export class CanMessageComponent implements OnInit, OnDestroy {

  /**
   * Data refresh interval (in ms)
   */
  static readonly DATA_REFRESH_INTERVAL = 2000;
  /**
   * Max message queue length
   */
  readonly MAX_MESSAGES_QUEUE_LENGTH = 500;
  /**
   * Vehicle UUID
   */
  selectedVehicleId: string;
  /**
   * Data refresh timer
   */
  private dataRefreshTimer: any;
  /**
   * Scroll refresh timer
   */
  private scrollRefreshTimer: any;
  /**
   * Vehicle raw CAN message data
   */
  selectedVehicle: vehicle.admin.IVehicleProto;
  /**
   * Vehicle list
   */
  vehicleList: vehicle.admin.IVehicleListProto;
  /**
   * List of CAN message
   */
  messageDataSource: vehicle.message.ICanBusMessageProto[] = [];
  /**
   * Check auto scroll
   */
  isAutoScrolling = true;
  /**
   * Scrolling button text
   */
  scrollingButtonText = 'Pause scrolling';
  /**
   * Data latest timestamp
   */
  latestTimestamp = Long.ZERO;

  @ViewChild('terminalScroller')
  terminalScroller: PerfectScrollbarDirective;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private vehicleService: VehicleService,
  ) { }

  ngOnInit() {
    const self = this;

    // Retrieve vehicle UUID from parameters
    self.loadListVehicles();
  }

  ngOnDestroy() {
    clearTimeout(this.dataRefreshTimer);
    clearTimeout(this.scrollRefreshTimer);
  }

  /**
   * Event when change vehicle on dropdown list
   * @param vehicleId selected vehicle ID
   */
  changeVehicle(vehicleId) {
    clearTimeout(this.dataRefreshTimer);
    this.resetLog();
    this.listCanMessages(vehicleId);
  }

  /**
   * load vehicle list
   */
  private loadListVehicles() {
    const self = this;

    // Request list of vehicles
    self.vehicleList = null;
    this.vehicleService.getListVehicles().subscribe((vehicles) => {
      self.vehicleList = vehicles;

      if (self.vehicleList && self.vehicleList.data && self.vehicleList.data.length > 0) {
        self.selectedVehicleId = self.vehicleList.data[0].id;
        self.listCanMessages(self.selectedVehicleId);
      }
    });
  }

  /**
   * List all routes of vehicle
   */
  private listCanMessages(vehicleId: string) {
    const self = this;

    // Get CAN message from server
    self.vehicleService.getVehicleMessages(vehicleId, self.latestTimestamp).subscribe((messagesData) => {
      // find the point to update message data source
      const sortedMessages = messagesData.canBus.reverse();

      if (!self.messageDataSource || self.messageDataSource.length === 0) {
        // new queue
        // sort by timestamp
        self.messageDataSource = sortedMessages.map(m => self.convertMessage(m));
      } else {
        // append new message into current queue
        self.messageDataSource = self.messageDataSource.concat(sortedMessages.map(m => self.convertMessage(m)));
      }

      // check max length of current queue, remove records which out of range
      if (self.messageDataSource.length > this.MAX_MESSAGES_QUEUE_LENGTH) {
        self.messageDataSource.splice(0, self.messageDataSource.length - this.MAX_MESSAGES_QUEUE_LENGTH);
      }

      // check auto scrolling
      if (self.isAutoScrolling) {
        self.scrollToBottom();
      }

      // save latest timestamp
      if (messagesData.timeRange != null) {
        self.latestTimestamp = messagesData.timeRange.until;
      }

      // continuously get data
      self.dataRefreshTimer = setTimeout(() => self.listCanMessages(vehicleId), CanMessageComponent.DATA_REFRESH_INTERVAL);
    });
  }

  /**
   * Clear message queue
   */
  clearMessage() {
    this.messageDataSource = [];
  }

  /**
   * Reset log
   */
  resetLog() {
    this.clearMessage();
    this.isAutoScrolling = true;
    this.scrollingButtonText = 'Pause scrolling';
    this.scrollToBottom();
  }

  /**
   * Pause/Resume auto scrolling
   */
  changeAutoScrolling() {
    this.isAutoScrolling = !this.isAutoScrolling;
    this.scrollingButtonText = this.isAutoScrolling ? 'Pause scrolling' : 'Resume scrolling';
    if (this.isAutoScrolling) {
      this.scrollToBottom();
    }
  }

  /**
   * Scroll queue to bottom
   */
  private scrollToBottom() {
    const self = this;
    setTimeout(() => { self.terminalScroller.scrollToBottom(undefined, 300); }, 0);
  }

  /**
   * Scroll queue to top
   */
  scrollToTop() {
    const self = this;
    setTimeout(() => { self.terminalScroller.scrollToTop(undefined, 1000); }, 0);
  }

  /**
   * convert raw message to show time and data
   * @param message raw message
   */
  private convertMessage(message: any) {
    return {
      timestamp: message.timestamp,
      milliTimestamp: message.timestamp.divide(1000000).toNumber(),
      data: this.toHexString(message.data),
      dlc: message.dlc,
      messageId: message.messageId.toString(16),
      ascii: this.toASCII(message.data)
    };
  }

  /**
   * Convert bytearray to hex string
   * @param byteArray source bytearray
   */
  private toHexString(byteArray) {
    return Array.prototype.map.call(byteArray, function (byte) {
      // tslint:disable-next-line:no-bitwise
      return ('0' + (byte & 0xFF).toString(16)).slice(-2);
    }).join('-');
  }

  /**
   * Convert bytearray to ASCII printable characters string
   * @param byteArray source bytearray
   */
  private toASCII(byteArray: Uint8Array) {
    let ascStr = '';
    byteArray.forEach((code) => {
      if (code > 126 || code < 33) {
        ascStr += '.';
      } else {
        ascStr += String.fromCharCode(code);
      }
    });
    return ascStr;
  }
}
