import { NotificationInMemoryRepository } from "@test/in-memory-repository/notification-in-memory"
import { Content } from "@application/entities/content/content"
import { Notification } from "@application/entities/notification/notification"
import { NotificationNotFoundError } from "../../../utils/errors/notification-not-found-error"
import { unReadNotificationUseCase } from "./un-read-notification-use-case"

describe('Unread Notification', () => {
  it('should be possible unread a notification', async () => {
    const notificationRepository = new NotificationInMemoryRepository()
    const unReadNotification = new unReadNotificationUseCase(notificationRepository)

    const notification = new Notification({
      category: 'teste',
      content: new Content('test content'),
      recipientId: 'test_recipient_id'
    })

    await notificationRepository.create(notification)
    await unReadNotification.execute({ notificationId: notification.notification_id })

    expect(notificationRepository.notifications[0].readed).toBeNull()
  })

  it('should not be able to unread a notification when it does not exist', async () => {
    const notificationRepository = new NotificationInMemoryRepository()
    const readNotification = new unReadNotificationUseCase(notificationRepository)

    expect(async () => {
      return readNotification.execute({ notificationId: 'fake_notification_id' })
    }).rejects.toThrow(NotificationNotFoundError)
  })
})