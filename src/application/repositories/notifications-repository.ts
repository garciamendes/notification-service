import { Notification } from "@application/entities/notification/notification";

export abstract class NotificationRepository {
  abstract create(notification: Notification): Promise<void>
  abstract findById(notificationId: string): Promise<Notification | null>
  abstract save(notification: Notification): Promise<void>
  abstract findCountByRecipientId(recipientId: string): Promise<number>
  // abstract list(): Promise<Notification>
}