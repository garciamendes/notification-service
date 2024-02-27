import { Notification } from "@application/entities/notification/notification";

export class PrismaNotificationMapper {
  static toPrisma(notification: Notification) {
    return {
      category: notification.category,
      content: notification.content.value,
      recipientId: notification.recipientId,
      readed: notification.readed
    }
  }
}