import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { ConfigService } from "@nestjs/config";
import { Location, Trip, TripDocument } from "../entity/trip/trip.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
@WebSocketGateway(8000, { transports: ["websocket"] })
export class WebSocketGateWay
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly configService: ConfigService,
    @InjectModel(Trip.name)
    private readonly tripModel: Model<TripDocument>
  ) {}
  @WebSocketServer()
  server: Server;

  private fakeLocationInterval: NodeJS.Timeout;

  handleConnection(client: Socket) {
    try {
      client.emit("connect_tendered", "Welcome to the Tendered SocketGateway");
    } catch (e) {
      console.log(e);
      client.emit("error", e.message);
      client.disconnect();
    }
  }
  handleDisconnect(client: Socket) {
    console.log("client disconnected", client.handshake.headers.cookie);
  }
  async startSendingFakeLocationData(tripId: string) {
    this.fakeLocationInterval = setInterval(async () => {
      const fakeLocation: Location = {
        lat: Math.random() * (90 - -90) + -90,
        long: Math.random() * (180 - -180) + -180,
      };
      const trip = await this.tripModel.findById(tripId);
      const liveLocation = trip.liveLocation
        ? [...trip.liveLocation, fakeLocation]
        : [fakeLocation];
      await this.tripModel.updateOne(
        { _id: trip._id },
        { $set: { liveLocation: liveLocation } }
      );
      this.server.emit("location_data", fakeLocation);
    }, 5000);
  }

  stopSendingFakeLocationData() {
    clearInterval(this.fakeLocationInterval);
  }
}
