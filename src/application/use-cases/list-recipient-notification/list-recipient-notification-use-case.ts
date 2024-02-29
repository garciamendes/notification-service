import { Notification } from "@application/entities/notification/notification";
import { NotificationRepository } from "@application/repositories/notifications-repository";
import { Injectable } from "@nestjs/common";

interface ListRecipientNotificationRequest {
  recipientId: string
}

interface ListRecipientNotificationResponse {
  notifications: Notification[]
}

@Injectable()
export class ListRecipientNotificationUseCase {
  constructor(private notificationRespository: NotificationRepository) { }

  async execute(request: ListRecipientNotificationRequest): Promise<ListRecipientNotificationResponse> {
    const { recipientId } = request

    const notifications = await this.notificationRespository.findManyByRecipientId(recipientId)

    return { notifications }
  }
}