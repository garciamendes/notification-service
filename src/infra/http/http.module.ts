import { Module } from "@nestjs/common";
import { DatabaseModule } from "@infra/database/database.module";
import { SendNotificationUseCase } from "@application/use-cases/send-notification/send-notification-use-case";
import { NotificationController } from "./controllers/notification.controller";
import { CancelNotificationUseCase } from "@application/use-cases/cancel-notification/cancel-notification-use-case";
import { ListRecipientNotificationUseCase } from "@application/use-cases/list-recipient-notification/list-recipient-notification-use-case";
import { ReadNotificationUseCase } from "@application/use-cases/read-notification/read-notification-use-case";
import { UnReadNotificationUseCase } from "@application/use-cases/un-read-notification/un-read-notification-use-case";
import { CountRecipientNotificationUseCase } from "@application/use-cases/count-recipient-notifications/count-recipient-notification-use-case";

@Module({
  imports: [
    DatabaseModule
  ],
  controllers: [NotificationController],
  providers: [
    SendNotificationUseCase,
    CancelNotificationUseCase,
    ListRecipientNotificationUseCase,
    ReadNotificationUseCase,
    UnReadNotificationUseCase,
    CountRecipientNotificationUseCase,
    ListRecipientNotificationUseCase
  ]
})
export class HttpModule { }