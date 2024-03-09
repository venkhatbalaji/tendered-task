import { Maintenance } from "./maintenance.dto";
import { Trip } from "./trips.dto";
import { Vehicle } from "./vehicle.dto";

export interface Response<T> {
  success: boolean;
  data: T;
}

export interface VehicleInformation {
  vehicle: Vehicle;
  maintenance: Array<Maintenance> | [];
  trips: Trip[];
}

export interface OdometerReading {
  reading: number;
  unit: string;
}

export interface Location {
  lat: number
  long: number
}