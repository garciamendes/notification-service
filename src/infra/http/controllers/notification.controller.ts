import { Body, Controller, Post } from "@nestjs/common";
import { SendNotification } from "@application/use-cases/send-notification/send-notification-use-case";
import { CreateNotificationBodyDTO } from "../dtos/create-notification-body";
import { NotificationViewModel } from "../view-models/notification-view-model";

@Controller()
export class NotificationController {
  constructor(private sendNotification: SendNotification) { }

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