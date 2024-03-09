import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { WebSocketGateWay } from "./websocket.gateway";
import { TripModule } from "../entity/trip/trip.module";

@Module({
  providers: [ConfigService, WebSocketGateWay],
  controllers: [],
  imports: [TripModule],
})
export class WebSocketModule {}
