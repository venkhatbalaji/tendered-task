import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Maintenance, MaintenanceSchema } from "./maintenance.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Maintenance.name, schema: MaintenanceSchema }]),
  ],
  exports: [MongooseModule],
})
export class MaintenanceModule {}
