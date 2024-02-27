import { Notification } from "@application/entities/notification/notification";
import { NotificationRepository } from "@application/repositories/notifications-repository";

export class NotificationInMemoryRepository implements NotificationRepository {
  public notifications: Notification[] = []

  async create(notification: Notification) {
    this.notifications.push(notification)
  }

  async findById(notificationId: string) {
    const notification = this.notifications.find(notification => notification.notification_id === notificationId)

    if (!notification)
      return null

    return notification
  }

  async save(notification: Notification) {
    const notificationIndex = this.notifications.findIndex(notification => notification.notification_id === notification.notification_id)

    if (notificationIndex >= 0)
      this.notifications[notificationIndex] = notification
  }
}