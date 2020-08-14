import * as Moment from 'moment';
import * as Long from 'long';
import { vehicle } from './protoBundle';


export class GPSLine {
    color: String;
    points: vehicle.message.IGpsEventProto[];

    constructor(color: String, points: vehicle.message.IGpsEventProto[]) {
        const self = this;

        self.color = color;
        self.points = points;
    }
}
