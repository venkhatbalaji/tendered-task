import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { VehicleController } from "../controller/controller";
import { ConfigModule } from "../config/config.module";
import { VehicleModule } from "../entity/vehicle/vehicle.module";
import { DatabaseModule } from "../database/database.module";
import { MaintenanceModule } from "../entity/maintenance/maintenance.module";
import { TripModule } from "../entity/trip/trip.module";
import { SeedService } from "../database/seed.service";
import { WebSocketModule } from "../websocket/websocket.module";
import { WebSocketGateWay } from "../websocket/websocket.gateway";
import { Service } from "../service/service";
@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    VehicleModule,
    MaintenanceModule,
    WebSocketModule,
    TripModule,
  ],
  providers: [SeedService, WebSocketGateWay, Service],
  controllers: [VehicleController],
})
export class MainModule implements NestModule {
  constructor(private readonly seedService: SeedService) {}
  async onModuleInit() {
    await this.seedService.seedData();
  }
  configure(consumer: MiddlewareConsumer) {}
}
