import { OdometerReading } from "./common.dto";

export interface Maintenance {
  _id: string;
  vehicleId: string;
  startDate: string;
  description: string;
  odometerReading: OdometerReading;
  status: string;
  __v: number;
}
