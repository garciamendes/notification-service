import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { SendNotificationUseCase } from "@application/use-cases/send-notification/send-notification-use-case";
import { CreateNotificationBodyDTO } from "../dtos/create-notification-body";
import { NotificationViewModel } from "../view-models/notification-view-model";
import { CancelNotificationUseCase } from "@application/use-cases/cancel-notification/cancel-notification-use-case";
import { ReadNotificationUseCase } from "@application/use-cases/read-notification/read-notification-use-case";
import { UnReadNotificationUseCase } from "@application/use-cases/un-read-notification/un-read-notification-use-case";
import { CountRecipientNotificationUseCase } from "@application/use-cases/count-recipient-notifications/count-recipient-notification-use-case";
import { ListRecipientNotificationUseCase } from "@application/use-cases/list-recipient-notification/list-recipient-notification-use-case";
@Controller('notifications')
export class NotificationController {
  constructor(
    private sendNotification: SendNotificationUseCase,
    private cancelNotification: CancelNotificationUseCase,
    private readNotification: ReadNotificationUseCase,
    private unReadNotification: UnReadNotificationUseCase,
    private countReadNotification: CountRecipientNotificationUseCase,
    private listNotifications: ListRecipientNotificationUseCase
  ) { }

  @Get(':recipientId')
  async listByRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } = await this.listNotifications.execute({ recipientId })

    const raw = notifications.map(NotificationViewModel.toHTTP)
    return { notifications: raw }
  }

  @Get(':recipientId/count-notification')
  async countFromRecipient(@Param('recipientId') recipientId: string) {
    const { countNotifications } = await this.countReadNotification.execute({ recipientId })

    return { countNotifications }
  }

  @Patch(':notificationId/cancel')
  async cancel(@Param('notificationId') notificationId: string) {
    await this.cancelNotification.execute({ notificationId })
  }

  @Patch(':notificationId/read')
  async read(@Param('notificationId') notificationId: string) {
    await this.readNotification.execute({ notificationId })
  }

  @Patch(':notificationId/unread')
  async unRead(@Param('notificationId') notificationId: string) {
    await this.unReadNotification.execute({ notificationId })
  }

  @Post()
  async create(@Body() body: CreateNotificationBodyDTO) {
    const { recipientId, content, category } = body

    const { notification } = await this.sendNotification.execute({
      category,
      content,
      recipientId
    })

    const raw = NotificationViewModel.toHTTP(notification)
    return { notification: raw }
  }
}