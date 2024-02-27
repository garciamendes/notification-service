import { Body, Controller, Post } from "@nestjs/common";
import { CreateNotificationBodyDTO } from "../dtos/create-notification-body";
import { SendNotification } from "src/application/use-cases/send-notification/send-notification-use-case";

@Controller()
export class NotificationController {
  constructor(private sendNotification: SendNotification) {}

  @Post()
  async create(@Body() body: CreateNotificationBodyDTO) {
    const { recipientId, content, category } = body

    const { notification } = await this.sendNotification.execute({
      category,
      content,
      recipientId
    })

    return { notification }
  }
}