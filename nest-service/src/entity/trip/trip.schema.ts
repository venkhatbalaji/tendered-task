import { Prop, Schema as MainSchema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Reading } from "../shared/shared.entity";

export interface Location {
  lat: number;
  long: number;
}

@MainSchema()
export class Trip extends Document {
  @Prop({ type: Types.ObjectId, ref: "Vehicle" })
  vehicleId: Types.ObjectId;

  @Prop()
  startTime: Date;

  @Prop()
  endTime: Date;

  @Prop({ type: Array<Location> })
  liveLocation: Array<Location>;

  @Prop({ type: Object })
  startLocation: Location;

  @Prop({ type: Object })
  endLocation: Location;

  @Prop({ type: Object })
  distance: Reading;

  @Prop()
  active: Boolean;
}

export const TripSchema = SchemaFactory.createForClass(Trip);
export type TripDocument = Trip & Document;
