import { Injectable } from "@nestjs/common";
import { NotificationNotFoundError } from "@utils/errors/notification-not-found-error";
import { NotificationRepository } from "@application/repositories/notifications-repository";

interface unReadNotificationRequest {
  notificationId: string
}

type unReadNotificationResponse = void

@Injectable()
export class unReadNotificationUseCase {
  constructor(private notificationRespository: NotificationRepository) {}

  async execute(request: unReadNotificationRequest) {
    const { notificationId } = request

    const notification = await this.notificationRespository.findById(notificationId)

    if (!notification)
      throw new NotificationNotFoundError()

    notification.unRead()
    await this.notificationRespository.save(notification)
  }
}