import { NestFactory } from "@nestjs/core";
import { MainModule } from "./module/module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(MainModule);
  app.enableCors({
    origin: ["http://localhost:3001", "http://localhost:3000"],
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true,
  });
  const configService = app.get(ConfigService);
  const config = new DocumentBuilder()
    .setTitle("Vehicle Service")
    .setDescription("Vehicle service to provide all vehicle related data")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document);
  await app.listen(configService.get<number>("PORT") || 8002);
}
bootstrap();
