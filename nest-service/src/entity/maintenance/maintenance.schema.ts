import { Prop, Schema as MainSchema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Reading } from "../shared/shared.entity";

export enum MaintenanceStatus {
  Complete = "complete",
  InProgress = "in-progress",
  Initiated = "initiated",
}

@MainSchema()
export class Maintenance extends Document {
  @Prop({ type: Types.ObjectId, ref: "Vehicle" })
  vehicleId: Types.ObjectId;

  @Prop()
  startDate: string;

  @Prop()
  description: string;

  @Prop({ type: Object })
  odometerReading: Reading;

  @Prop({ enum: MaintenanceStatus })
  status: MaintenanceStatus;
}

export const MaintenanceSchema = SchemaFactory.createForClass(Maintenance);
export type MaintenanceDocument = Maintenance & Document;
