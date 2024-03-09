import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Trip, TripSchema } from "./trip.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Trip.name, schema: TripSchema }]),
  ],
  exports: [MongooseModule],
})
export class TripModule {}
