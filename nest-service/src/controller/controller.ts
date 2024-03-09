import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from "@nestjs/common";
import { Response as ExpressResponse } from "express";
import {
  CreateVehicleDto,
  StartMaintenanceDto,
  StartTripDto,
  StopTripDto,
  UpdateMaintenanceStatusDto,
  validateCreateVehicleRequest,
  validateStartMaintenanceRequest,
  validateStartTripRequest,
  validateStopTripRequest,
  validateUpdateMaintenanceStatusRequest,
} from "../validators/vehicle.validators";
import { ErrorMessage, createFailureResponse } from "../common/common.response";
import { Service } from "../service/service";

@Controller("vehicles")
export class VehicleController {
  constructor(private readonly service: Service) {}
  @Get("/")
  async healthCheck(@Res() res: ExpressResponse) {
    return res.status(HttpStatus.OK).json({
      message: "Healthy",
      memoryUsage: process.memoryUsage().rss / 1024 / 1024,
    });
  }

  @Post(":userid/add-vehicle")
  async addVehicle(
    @Res() res: ExpressResponse,
    @Body() body: CreateVehicleDto,
    @Param("userid") userId: string
  ) {
    const isValidReq = validateCreateVehicleRequest(body);
    if (isValidReq.valid && userId) {
      const response = await this.service.addVehicle(body, userId);
      return res
        .status(
          response.success === false ? HttpStatus.BAD_REQUEST : HttpStatus.OK
        )
        .json(response);
    } else {
      return res.status(HttpStatus.BAD_REQUEST).json(
        createFailureResponse(
          {
            message: `Invalid Request: ${isValidReq.errors}`,
          },
          ErrorMessage.BAD_REQUEST
        )
      );
    }
  }

  @Post(":vehicleid/update-vehicle")
  async updateVehicle(
    @Res() res: ExpressResponse,
    @Body() body: CreateVehicleDto,
    @Param("vehicleid") vehicleId: string
  ) {
    const isValidReq = validateCreateVehicleRequest(body);
    if (isValidReq.valid && vehicleId) {
      const response = await this.service.updateVehicle(body, vehicleId);
      return res
        .status(
          response.success === false ? HttpStatus.BAD_REQUEST : HttpStatus.OK
        )
        .json(response);
    } else {
      return res.status(HttpStatus.BAD_REQUEST).json(
        createFailureResponse(
          {
            message: `Invalid Request: ${isValidReq.errors}`,
          },
          ErrorMessage.BAD_REQUEST
        )
      );
    }
  }

  @Get(":userid/get-vehicles")
  async getAllVehicles(
    @Res() res: ExpressResponse,
    @Param("userid") userId: string
  ) {
    if (userId) {
      const response = await this.service.getAllVehicle(userId);
      return res
        .status(
          response.success === false ? HttpStatus.BAD_REQUEST : HttpStatus.OK
        )
        .json(response);
    } else {
      return res.status(HttpStatus.BAD_REQUEST).json(
        createFailureResponse(
          {
            message: `Invalid Request: userid is required`,
          },
          ErrorMessage.BAD_REQUEST
        )
      );
    }
  }

  @Get(":userid/get-vehicle/:vehicleid")
  async getVehicles(
    @Res() res: ExpressResponse,
    @Param("userid") userId: string,
    @Param("vehicleid") vehicleId: string
  ) {
    if (userId && vehicleId) {
      const response = await this.service.getVehicle(userId, vehicleId);
      return res
        .status(
          response.success === false ? HttpStatus.BAD_REQUEST : HttpStatus.OK
        )
        .json(response);
    } else {
      return res.status(HttpStatus.BAD_REQUEST).json(
        createFailureResponse(
          {
            message: `Invalid Request: userid and vehicleid is required`,
          },
          ErrorMessage.BAD_REQUEST
        )
      );
    }
  }

  @Post(":vehicleid/start-maintenance")
  async startMaintenance(
    @Res() res: ExpressResponse,
    @Body() body: StartMaintenanceDto,
    @Param("vehicleid") vehicleId: string
  ) {
    const isValidReq = validateStartMaintenanceRequest(body);
    if (isValidReq.valid && vehicleId) {
      const response = await this.service.startMaintenance(body, vehicleId);
      return res
        .status(
          response.success === false ? HttpStatus.BAD_REQUEST : HttpStatus.OK
        )
        .json(response);
    } else {
      return res.status(HttpStatus.BAD_REQUEST).json(
        createFailureResponse(
          {
            message: `Invalid Request: ${isValidReq.errors}`,
          },
          ErrorMessage.BAD_REQUEST
        )
      );
    }
  }

  @Get(":vehicleid/get-maintenance/:maintenanceid")
  async getMaintenance(
    @Res() res: ExpressResponse,
    @Param("maintenanceid") maintenanceid: string,
    @Param("vehicleid") vehicleId: string
  ) {
    if (maintenanceid && vehicleId) {
      const response = await this.service.getMaintenance(
        vehicleId,
        maintenanceid
      );
      return res
        .status(
          response.success === false ? HttpStatus.BAD_REQUEST : HttpStatus.OK
        )
        .json(response);
    } else {
      return res.status(HttpStatus.BAD_REQUEST).json(
        createFailureResponse(
          {
            message: `Invalid Request: maintenanceid and vehicleid is required`,
          },
          ErrorMessage.BAD_REQUEST
        )
      );
    }
  }

  @Get(":vehicleid/get-maintenance")
  async getAllMaintenance(
    @Res() res: ExpressResponse,
    @Param("vehicleid") vehicleId: string
  ) {
    if (vehicleId) {
      const response = await this.service.getAllMaintenance(vehicleId);
      return res
        .status(
          response.success === false ? HttpStatus.BAD_REQUEST : HttpStatus.OK
        )
        .json(response);
    } else {
      return res.status(HttpStatus.BAD_REQUEST).json(
        createFailureResponse(
          {
            message: `Invalid Request: vehicleid is required`,
          },
          ErrorMessage.BAD_REQUEST
        )
      );
    }
  }

  @Post(":maintenanceid/update-status")
  async updateMaintenanceStatus(
    @Res() res: ExpressResponse,
    @Body() body: UpdateMaintenanceStatusDto,
    @Param("maintenanceid") maintenanceid: string
  ) {
    const isValidReq = validateUpdateMaintenanceStatusRequest(body);
    if (isValidReq.valid) {
      const response = null;
      return res
        .status(
          response.success === false ? HttpStatus.BAD_REQUEST : HttpStatus.OK
        )
        .json(response);
    } else {
      return res.status(HttpStatus.BAD_REQUEST).json(
        createFailureResponse(
          {
            message: `Invalid Request: ${isValidReq.errors}`,
          },
          ErrorMessage.BAD_REQUEST
        )
      );
    }
  }

  @Get(":vehicleid/get-trips")
  async getAllTrips(
    @Res() res: ExpressResponse,
    @Param("vehicleid") vehicleId: string
  ) {
    if (vehicleId) {
      const response = await this.service.getAllTrips(vehicleId);
      return res
        .status(
          response.success === false ? HttpStatus.BAD_REQUEST : HttpStatus.OK
        )
        .json(response);
    } else {
      return res.status(HttpStatus.BAD_REQUEST).json(
        createFailureResponse(
          {
            message: `Invalid Request: vehicleid is required`,
          },
          ErrorMessage.BAD_REQUEST
        )
      );
    }
  }

  @Post(":vehicleid/start-trip")
  async startTrip(
    @Res() res: ExpressResponse,
    @Body() body: StartTripDto,
    @Param("vehicleid") vehicleId: string
  ) {
    const isValidReq = validateStartTripRequest(body);
    if (isValidReq.valid) {
      const response = await this.service.startTrip(body, vehicleId);
      return res
        .status(
          response.success === false ? HttpStatus.BAD_REQUEST : HttpStatus.OK
        )
        .json(response);
    } else {
      return res.status(HttpStatus.BAD_REQUEST).json(
        createFailureResponse(
          {
            message: `Invalid Request: ${isValidReq.errors}`,
          },
          ErrorMessage.BAD_REQUEST
        )
      );
    }
  }

  @Post(":tripid/stop-trip")
  async stopTrip(
    @Res() res: ExpressResponse,
    @Body() body: StopTripDto,
    @Param("tripid") tripid: string
  ) {
    const isValidReq = validateStopTripRequest(body);
    if (isValidReq.valid && tripid) {
      const response = await this.service.stopTrip(body, tripid);
      return res
        .status(
          response.success === false ? HttpStatus.BAD_REQUEST : HttpStatus.OK
        )
        .json(response);
    } else {
      return res.status(HttpStatus.BAD_REQUEST).json(
        createFailureResponse(
          {
            message: `Invalid Request: tripId required`,
          },
          ErrorMessage.BAD_REQUEST
        )
      );
    }
  }
}
