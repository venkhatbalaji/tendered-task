import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import {
  Maintenance,
  MaintenanceDocument,
  MaintenanceStatus,
} from "../entity/maintenance/maintenance.schema";
import {
  Status,
  Vehicle,
  VehicleDocument,
} from "../entity/vehicle/vehicle.schema";
import {
  CreateVehicleDto,
  StartMaintenanceDto,
  StartTripDto,
  StopTripDto,
  UpdateMaintenanceStatusDto,
} from "../validators/vehicle.validators";
import {
  ErrorMessage,
  ErrorResponse,
  Response,
  createFailureResponse,
  createSuccessResponse,
} from "../common/common.response";
import { Trip, TripDocument } from "../entity/trip/trip.schema";
import { WebSocketGateWay } from "../websocket/websocket.gateway";

@Injectable()
export class Service {
  constructor(
    @InjectModel(Vehicle.name)
    private readonly vehicleModel: Model<VehicleDocument>,
    @InjectModel(Maintenance.name)
    private readonly vehicleMaintenanceModel: Model<MaintenanceDocument>,
    @InjectModel(Trip.name)
    private readonly tripModel: Model<TripDocument>,
    private readonly wsGateway: WebSocketGateWay
  ) {}

  async addVehicle(
    data: CreateVehicleDto,
    userId: string
  ): Promise<Response<Vehicle | ErrorResponse<object>>> {
    try {
      // TODO: User check
      const vehicle = await this.vehicleModel.create({
        vehicleModel: data.vehicleModel,
        vehicleType: data.vehicleType,
        licensePlate: data.licensePlate,
        status: Status.Active,
        nextMaintainanceDate: data.nextMaintainanceDate,
        updatedDate: new Date(),
      });
      return createSuccessResponse(vehicle);
    } catch (err) {
      // TODO: Logging exception;
      console.log(err);
      return createFailureResponse(
        {
          message: "Error in get addVehicle",
        },
        ErrorMessage.SERVER_ERROR
      );
    }
  }

  async updateVehicle(
    data: CreateVehicleDto,
    vehicleId: string
  ): Promise<Response<Vehicle | ErrorResponse<object>>> {
    try {
      const vehicle = await this.vehicleModel.findById(vehicleId);
      if (!vehicle) {
        return createFailureResponse(
          {
            message: "Vehicle not found",
          },
          ErrorMessage.VEHICLE_NOT_FOUND
        );
      }
      await this.vehicleModel.updateOne(
        { _id: vehicle._id },
        {
          $set: {
            vehicleModel: data.vehicleModel,
            vehicleType: data.vehicleType,
            licensePlate: data.licensePlate,
            nextMaintainanceDate: data.nextMaintainanceDate,
            updatedDate: new Date(),
          },
        }
      );
      return createSuccessResponse(vehicle);
    } catch (err) {
      // TODO: Logging exception;
      console.log(err);
      return createFailureResponse(
        {
          message: "Error in get updateVehicle",
        },
        ErrorMessage.SERVER_ERROR
      );
    }
  }

  async getAllVehicle(
    userId: string
  ): Promise<Response<Array<Vehicle> | ErrorResponse<object>>> {
    try {
      // TODO: User check
      const vehicles = await this.vehicleModel.find();
      return createSuccessResponse(vehicles);
    } catch (err) {
      // TODO: Logging exception;
      console.log(err);
      return createFailureResponse(
        {
          message: "Error in get getAllVehicle",
        },
        ErrorMessage.SERVER_ERROR
      );
    }
  }

  async getVehicle(
    userId: string,
    vehicleId: string
  ): Promise<Response<Vehicle | ErrorResponse<object>>> {
    try {
      // TODO: User check
      const vehicle = await this.vehicleModel.findById(vehicleId);
      return createSuccessResponse(vehicle);
    } catch (err) {
      // TODO: Logging exception;
      console.log(err);
      return createFailureResponse(
        {
          message: "Error in get getVehicle",
        },
        ErrorMessage.SERVER_ERROR
      );
    }
  }

  async startMaintenance(
    data: StartMaintenanceDto,
    vehicleId: string
  ): Promise<Response<Maintenance | ErrorResponse<object>>> {
    try {
      // TODO: User check
      const vehicle = await this.vehicleModel.findById(vehicleId);
      if (!vehicle) {
        return createFailureResponse(
          {
            message: "Vehicle not found",
          },
          ErrorMessage.VEHICLE_NOT_FOUND
        );
      }
      if (vehicle.status === Status.Maintenance) {
        return createFailureResponse(
          {
            message: "Vehicle already under maintenance",
          },
          ErrorMessage.VEHICLE_UNDERMAINTENANCE
        );
      }
      await this.vehicleModel.updateOne(
        { _id: vehicle._id },
        {
          $set: {
            status: Status.Maintenance,
          },
        }
      );
      const maintenance = await this.vehicleMaintenanceModel.create({
        vehicleId: vehicle._id,
        startDate: new Date(),
        description: data.description,
        odometerReading: data.odometerReading,
        status: MaintenanceStatus.Initiated,
      });
      return createSuccessResponse(maintenance);
    } catch (err) {
      // TODO: Logging exception;
      console.log(err);
      return createFailureResponse(
        {
          message: "Error in get startMaintenance",
        },
        ErrorMessage.SERVER_ERROR
      );
    }
  }

  async getMaintenance(
    vehicleid: string,
    maintenanceid: string
  ): Promise<Response<Maintenance | ErrorResponse<object>>> {
    try {
      // TODO: User check
      const vehicle = await this.vehicleModel.findById(vehicleid);
      if (!vehicle) {
        return createFailureResponse(
          {
            message: "Vehicle not found",
          },
          ErrorMessage.VEHICLE_NOT_FOUND
        );
      }
      const maintenance =
        await this.vehicleMaintenanceModel.findById(maintenanceid);
      return createSuccessResponse(maintenance);
    } catch (err) {
      // TODO: Logging exception;
      console.log(err);
      return createFailureResponse(
        {
          message: "Error in get getMaintenance",
        },
        ErrorMessage.SERVER_ERROR
      );
    }
  }

  async getAllMaintenance(
    vehicleid: string
  ): Promise<Response<Array<Maintenance> | ErrorResponse<object>>> {
    try {
      // TODO: User check
      const vehicle = await this.vehicleModel.findById(vehicleid);
      if (!vehicle) {
        return createFailureResponse(
          {
            message: "Vehicle not found",
          },
          ErrorMessage.VEHICLE_NOT_FOUND
        );
      }
      const maintenance = await this.vehicleMaintenanceModel.find({
        vehicleId: vehicle._id,
      });
      return createSuccessResponse(maintenance);
    } catch (err) {
      // TODO: Logging exception;
      console.log(err);
      return createFailureResponse(
        {
          message: "Error in get getMaintenance",
        },
        ErrorMessage.SERVER_ERROR
      );
    }
  }

  async updateMaintenance(
    data: UpdateMaintenanceStatusDto,
    maintenanceid: string
  ): Promise<Response<Object | ErrorResponse<object>>> {
    try {
      const maintenance =
        await this.vehicleMaintenanceModel.findById(maintenanceid);
      if (!maintenance) {
        return createFailureResponse(
          {
            message: "Maintenance not found",
          },
          ErrorMessage.VEHICLE_MAINTENANCE_NOT_FOUND
        );
      }
      await this.vehicleMaintenanceModel.updateOne(
        { _id: maintenance._id },
        {
          $set: {
            status: data.status,
          },
        }
      );
      return createSuccessResponse({ message: "Maintenance updated" });
    } catch (err) {
      // TODO: Logging exception;
      console.log(err);
      return createFailureResponse(
        {
          message: "Error in get updateMaintenance",
        },
        ErrorMessage.SERVER_ERROR
      );
    }
  }

  async getAllTrips(
    vehicleid: string
  ): Promise<Response<Array<Trip> | ErrorResponse<object>>> {
    try {
      // TODO: User check
      const vehicle = await this.vehicleModel.findById(vehicleid);
      if (!vehicle) {
        return createFailureResponse(
          {
            message: "Vehicle not found",
          },
          ErrorMessage.VEHICLE_NOT_FOUND
        );
      }
      const trips = await this.tripModel.find({
        vehicleId: vehicle._id,
      });
      return createSuccessResponse(trips);
    } catch (err) {
      // TODO: Logging exception;
      console.log(err);
      return createFailureResponse(
        {
          message: "Error in get getAllTrips",
        },
        ErrorMessage.SERVER_ERROR
      );
    }
  }

  async startTrip(
    data: StartTripDto,
    vehicleid: string
  ): Promise<Response<Trip | ErrorResponse<object>>> {
    try {
      const vehicle = await this.vehicleModel.findById(vehicleid);
      if (!vehicle) {
        return createFailureResponse(
          {
            message: "Vehicle not found",
          },
          ErrorMessage.VEHICLE_NOT_FOUND
        );
      }
      const liveTrip = await this.tripModel.findOne({
        vehicleId: vehicle._id,
        active: true,
      });
      console.log(liveTrip);
      if (liveTrip) {
        return createFailureResponse(
          {
            message: "Ongoing trip available",
          },
          ErrorMessage.TRIP_AVAILABLE
        );
      }
      const trip = await this.tripModel.create({
        vehicleId: vehicle._id,
        startTime: new Date(),
        startLocation: data.startLocation,
        active: true,
      });
      this.wsGateway.startSendingFakeLocationData(trip._id);
      return createSuccessResponse(trip);
    } catch (err) {
      // TODO: Logging exception;
      console.log(err);
      return createFailureResponse(
        {
          message: "Error in get startTrip",
        },
        ErrorMessage.SERVER_ERROR
      );
    }
  }

  async stopTrip(
    data: StopTripDto,
    tripid: string
  ): Promise<Response<Trip | ErrorResponse<object>>> {
    try {
      const trip = await this.tripModel.findById(tripid);
      if (!trip) {
        return createFailureResponse(
          {
            message: "trip not found",
          },
          ErrorMessage.TRIP_NOT_FOUND
        );
      }
      await this.tripModel.updateOne(
        {
          _id: trip._id,
        },
        {
          endLocation: data.stopLocation,
          endTime: new Date(),
          distance: {
            reading: 123123,
            unit: "KM",
          },
          active: false,
        }
      );
      return createSuccessResponse(trip);
    } catch (err) {
      // TODO: Logging exception;
      console.log(err);
      return createFailureResponse(
        {
          message: "Error in get stopTrip",
        },
        ErrorMessage.SERVER_ERROR
      );
    }
  }
}
