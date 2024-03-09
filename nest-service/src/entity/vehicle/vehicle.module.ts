import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Vehicle, VehicleSchema } from "./vehicle.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Vehicle.name, schema: VehicleSchema }]),
  ],
  exports: [MongooseModule],
})
export class VehicleModule {}
