import { Injectable } from "@nestjs/common";
import { NotificationNotFoundError } from "@utils/errors/notification-not-found-error";
import { NotificationRepository } from "@application/repositories/notifications-repository";

interface ReadNotificationRequest {
  notificationId: string
}

type ReadNotificationResponse = void

@Injectable()
export class ReadNotificationUseCase {
  constructor(private notificationRespository: NotificationRepository) {}

  async execute(request: ReadNotificationRequest) {
    const { notificationId } = request

    const notification = await this.notificationRespository.findById(notificationId)

    if (!notification)
      throw new NotificationNotFoundError()

    notification.read()
    await this.notificationRespository.save(notification)
  }
}