import { Vehicle } from "@/dto/vehicle.dto";
import { Response, VehicleInformation } from "@/dto/common.dto";
import { axiosInstance } from "./config";
import { Maintenance } from "@/dto/maintenance.dto";
import { Trip } from "@/dto/trips.dto";

export class VehicleApi {
  static async getAllVehicles(userId: string): Promise<Array<Vehicle> | []> {
    try {
      const response: any = await axiosInstance.get(
        `/vehicles/${userId}/get-vehicles`
      );
      const data: Response<Array<Vehicle>> = response.data;
      if (data.success) {
        return data.data;
      }
      return [];
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  static async getVehicleData(
    userId: string,
    vehicleid: string
  ): Promise<VehicleInformation | null> {
    try {
      const vehicleResponse: Promise<any> = axiosInstance.get(
        `/vehicles/${userId}/get-vehicle/${vehicleid}`
      );
      const maintenanceResponse: Promise<any> = axiosInstance.get(
        `/vehicles/${vehicleid}/get-maintenance`
      );
      const tripResponse: Promise<any> = axiosInstance.get(
        `/vehicles/${vehicleid}/get-trips`
      );
      const responseAll = await Promise.all([
        vehicleResponse,
        maintenanceResponse,
        tripResponse,
      ]);
      const data: {
        mainenanceResponse: Response<Array<Maintenance>>;
        vehicleResponse: Response<Vehicle>;
        tripResponse: Response<Array<Trip>>;
      } = {
        vehicleResponse: responseAll[0].data as Response<Vehicle>,
        mainenanceResponse: responseAll[1].data as Response<Array<Maintenance>>,
        tripResponse: responseAll[2].data as Response<Array<Trip>>,
      };
      if (
        data.mainenanceResponse.success &&
        data.tripResponse.success &&
        data.vehicleResponse.success
      ) {
        return {
          maintenance: data.mainenanceResponse.data,
          trips: data.tripResponse.data,
          vehicle: data.vehicleResponse.data,
        };
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async addVehicle(
    userId: string,
    vehicle: Partial<Vehicle>
  ): Promise<Vehicle | null> {
    try {
      const response: any = await axiosInstance.post(
        `/vehicles/${userId}/add-vehicle`,
        {
          vehicleModel: vehicle.vehicleModel,
          vehicleType: vehicle.vehicleType,
          licensePlate: vehicle.licensePlate,
          nextMaintainanceDate: vehicle.nextMaintainanceDate,
        }
      );
      const data: Response<Vehicle> = response.data;
      if (data.success) {
        return data.data;
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
