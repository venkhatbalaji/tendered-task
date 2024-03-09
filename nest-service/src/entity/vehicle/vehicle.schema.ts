import { Prop, Schema as MainSchema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export enum Status {
  Active = "active",
  Maintenance = "maintenance",
}

@MainSchema()
export class Vehicle extends Document {
  @Prop()
  vehicleModel: string;

  @Prop()
  vehicleType: string;

  @Prop()
  licensePlate: string;

  @Prop({ enum: Status })
  status: Status;

  @Prop()
  nextMaintainanceDate: Date;

  @Prop()
  updatedDate: Date;

  @Prop({ type: Date, default: Date.now() })
  createdAt: Date;
}

export const VehicleSchema = SchemaFactory.createForClass(Vehicle);
export type VehicleDocument = Vehicle & Document;
