import { Notification as RawNotification } from '@prisma/client'
import { Notification } from "@application/entities/notification/notification";
import { Content } from '@application/entities/content/content';

export class PrismaNotificationMapper {
  static toPrisma(notification: Notification) {
    return {
      id: notification.notification_id,
      category: notification.category,
      content: notification.content.value,
      recipientId: notification.recipientId,
      readed: notification.readed,
      canceled: notification.canceled,
      created: notification.created,
    }
  }

  static toDomain(raw: RawNotification): Notification {
    return new Notification({
      id: raw.id,
      category: raw.category,
      content: new Content(raw.content),
      recipientId: raw.recipientId,
      canceled: raw.canceled,
      created: raw.created,
      readed: raw.readed,
    })
  }
}