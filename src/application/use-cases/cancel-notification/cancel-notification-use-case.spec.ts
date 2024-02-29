import { NotificationInMemoryRepository } from "@test/in-memory-repository/notification-in-memory"
import { CancelNotificationUseCase } from "./cancel-notification-use-case"
import { Content } from "@application/entities/content/content"
import { Notification } from "@application/entities/notification/notification"
import { NotificationNotFoundError } from "../../../utils/errors/notification-not-found-error"

describe('Cancel Notification', () => {
  it('should be possible cancel a notification', async () => {
    const notificationRepository = new NotificationInMemoryRepository()
    const cancelNotification = new CancelNotificationUseCase(notificationRepository)

    const notification = new Notification({
      category: 'teste',
      content: new Content('test content'),
      recipientId: 'test_recipient_id'
    })

    await notificationRepository.create(notification)
    await cancelNotification.execute({ notificationId: notification.notification_id })

    expect(notificationRepository.notifications[0].canceled).toEqual(expect.any(Date))
  })

  it('should not be able to cancel a notification when it does not exist', async () => {
    const notificationRepository = new NotificationInMemoryRepository()
    const cancelNotification = new CancelNotificationUseCase(notificationRepository)

    expect(async () => {
      return cancelNotification.execute({ notificationId: 'fake_notification_id' })
    }).rejects.toThrow(NotificationNotFoundError)
  })
})