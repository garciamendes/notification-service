import { Module } from "@nestjs/common";
import { DatabaseModule } from "@infra/database/database.module";
import { SendNotification } from "@application/use-cases/send-notification/send-notification-use-case";
import { NotificationController } from "./controllers/notification.controller";

@Module({
  imports: [
    DatabaseModule
  ],
  controllers: [NotificationController],
  providers: [
   SendNotification
  ]
})
export class HttpModule {}