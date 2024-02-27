import { NotificationRepository } from "@application/repositories/notifications-repository";
import { Injectable } from "@nestjs/common";
import { NotificationNotFoundError } from "../errors/notification-not-found-error";

interface CancelNotificationRequest {
  notificationId: string
}

type CancelNotificationResponse = void

@Injectable()
export class CancelNotificationUseCase {
  constructor(private notificationRespository: NotificationRepository) {}

  async execute(request: CancelNotificationRequest) {
    const { notificationId } = request

    const notification = await this.notificationRespository.findById(notificationId)

    if (!notification)
      throw new NotificationNotFoundError()

    notification.cancel()
    await this.notificationRespository.save(notification)
  }
}