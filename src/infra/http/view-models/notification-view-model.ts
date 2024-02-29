import { Notification } from "@application/entities/notification/notification";

export class NotificationViewModel {
  static toHTTP(notification: Notification) {
    return {
      id: notification.notification_id,
      content: notification.content.value,
      category: notification.category,
      recipientId: notification.recipientId,
      created: notification.created,
      readed: notification.readed,
      canceled: notification.canceled
    }
  }
}