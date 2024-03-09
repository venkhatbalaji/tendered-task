import { Location, OdometerReading } from "./common.dto";

export interface Trip {
  _id: string;
  vehicleId: string;
  startTime: string;
  startLocation: Location;
  active: boolean;
  __v: number;
  liveLocation: Location[];
  distance: OdometerReading;
  endLocation: Location;
  endTime: string;
}
