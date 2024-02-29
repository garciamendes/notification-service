import { NotificationRepository } from "@application/repositories/notifications-repository";
import { Injectable } from "@nestjs/common";

interface CountRecipientNotificationRequest {
  recipientId: string
}

interface CountRecipientNotificationResponse {
  countNotifications: number
}

@Injectable()
export class CountRecipientNotificationUseCase {
  constructor(private notificationRespository: NotificationRepository) { }

  async execute(request: CountRecipientNotificationRequest): Promise<CountRecipientNotificationResponse> {
    const { recipientId } = request

    const countNotifications = await this.notificationRespository.findCountByRecipientId(recipientId)

    return { countNotifications }
  }
}