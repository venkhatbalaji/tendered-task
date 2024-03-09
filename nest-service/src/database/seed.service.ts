import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import {
  Status,
  Vehicle,
  VehicleDocument,
} from "../entity/vehicle/vehicle.schema";
import {
  Maintenance,
  MaintenanceDocument,
  MaintenanceStatus,
} from "../entity/maintenance/maintenance.schema";
@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Vehicle.name)
    private readonly vehicleModel: Model<VehicleDocument>,
    @InjectModel(Maintenance.name)
    private readonly vehicleMaintenanceModel: Model<MaintenanceDocument>
  ) {}
  async seedData() {
    const data = ["Toyota Camry 2023", "Ford F-150 2022", "Doosan G25-16"];
    const vehicleData = await Promise.all(
      data.map(async (v) => {
        return await this.vehicleModel.findOne({ vehicleModel: v });
      })
    );
    if (!vehicleData.some((data) => !!data)) {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + 2);
      const v1 = await this.vehicleModel.create({
        vehicleModel: "Toyota Camry 2023",
        vehicleType: "car",
        licensePlate: "ABC1234",
        status: Status.Active,
        nextMaintainanceDate: currentDate,
        updatedDate: new Date(),
      });
      await this.vehicleMaintenanceModel.create({
        vehicleId: v1._id,
        startDate: new Date(),
        description: "General Service",
        odometerReading: {
          reading: 190000,
          unit: "KM",
        },
        status: MaintenanceStatus.Complete,
      });
      currentDate.setDate(currentDate.getDate() + 88);
      const v2 = await this.vehicleModel.create({
        vehicleModel: "Ford F-150 2022",
        vehicleType: "truck",
        licensePlate: "DEF456",
        nextMaintainanceDate: currentDate,
        status: Status.Active,
        updatedDate: new Date(),
      });
      currentDate.setDate(currentDate.getDate() - 270);
      await this.vehicleMaintenanceModel.create({
        vehicleId: v2._id,
        startDate: currentDate,
        description: "Oil Service",
        odometerReading: {
          reading: 195000,
          unit: "KM",
        },
        status: MaintenanceStatus.Complete,
      });
      currentDate.setDate(currentDate.getDate() + 180);
      const v3 = await this.vehicleModel.create({
        vehicleModel: "Doosan G25-16",
        vehicleType: "forklift",
        licensePlate: "GHI789",
        nextMaintainanceDate: currentDate,
        status: Status.Active,
        updatedDate: new Date(),
      });
      currentDate.setDate(currentDate.getDate() - 560);
      await this.vehicleMaintenanceModel.create({
        vehicleId: v3._id,
        startDate: currentDate,
        description: "General Service",
        odometerReading: {
          reading: 110000,
          unit: "KM",
        },
        status: MaintenanceStatus.Complete,
      });
    }
  }
}
