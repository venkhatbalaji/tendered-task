import { ApiProperty } from "@nestjs/swagger";
import { Validator } from "jsonschema";
import { Status } from "../entity/vehicle/vehicle.schema";
import { Reading } from "../entity/shared/shared.entity";
import { Location } from "../entity/trip/trip.schema";
import { MaintenanceStatus } from "src/entity/maintenance/maintenance.schema";

const validator = new Validator();

export class CreateVehicleDto {
  @ApiProperty({
    type: "string",
  })
  vehicleModel: string;

  @ApiProperty({
    type: "string",
  })
  vehicleType: string;

  @ApiProperty({
    type: "string",
  })
  licensePlate: string;

  @ApiProperty({
    type: Date,
  })
  nextMaintainanceDate: Date;
}

export const validateCreateVehicleRequest = (body) => {
  return validator.validate(body, {
    type: "object",
    properties: {
      vehicleModel: {
        type: "string",
      },
      vehicleType: {
        type: "string",
      },
      licensePlate: {
        type: "string",
      },
      nextMaintainanceDate: {
        type: "string",
      },
    },
    required: [
      "vehicleModel",
      "vehicleType",
      "licensePlate",
      "nextMaintainanceDate",
    ],
  });
};

export class StartMaintenanceDto {
  @ApiProperty({
    type: "string",
  })
  description: string;

  @ApiProperty({
    type: "object",
  })
  odometerReading: Reading;
}

export const validateStartMaintenanceRequest = (body) => {
  return validator.validate(body, {
    type: "object",
    properties: {
      description: {
        type: "string",
      },
      odometerReading: {
        type: "object",
        properties: {
          reading: {
            type: "number",
          },
          unit: {
            type: "string",
          },
        },
        required: ["reading", "unit"],
      },
    },
    required: ["description", "odometerReading"],
  });
};

export class UpdateMaintenanceStatusDto {
  @ApiProperty({
    type: "enum",
    enum: MaintenanceStatus,
  })
  status: MaintenanceStatus;
}

export const validateUpdateMaintenanceStatusRequest = (body) => {
  return validator.validate(body, {
    type: "object",
    properties: {
      status: {
        type: "string",
        enum: [
          MaintenanceStatus.Complete,
          MaintenanceStatus.InProgress,
          MaintenanceStatus.Initiated,
        ],
      },
    },
    required: ["status"],
  });
};

export class StartTripDto {
  @ApiProperty({
    type: "object",
  })
  startLocation: Location;
}

export const validateStartTripRequest = (body) => {
  return validator.validate(body, {
    type: "object",
    properties: {
      startLocation: {
        type: "object",
        properties: {
          lat: {
            type: "number",
          },
          long: {
            type: "number",
          },
        },
        required: ["lat", "long"],
      },
    },
    required: ["startLocation"],
  });
};

export class StopTripDto {
  @ApiProperty({
    type: "object",
  })
  stopLocation: Location;
}

export const validateStopTripRequest = (body) => {
  return validator.validate(body, {
    type: "object",
    properties: {
        stopLocation: {
        type: "object",
        properties: {
          lat: {
            type: "number",
          },
          long: {
            type: "number",
          },
        },
        required: ["lat", "long"],
      },
    },
    required: ["stopLocation"],
  });
};
