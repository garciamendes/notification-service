import { NotificationInMemoryRepository } from "@test/in-memory-repository/notification-in-memory"
import { Content } from "@application/entities/content/content"
import { Notification } from "@application/entities/notification/notification"
import { NotificationNotFoundError } from "../../../utils/errors/notification-not-found-error"
import { ReadNotificationUseCase } from "./read-notification-use-case"

describe('Read Notification', () => {
  it('should be possible read a notification', async () => {
    const notificationRepository = new NotificationInMemoryRepository()
    const readNotification = new ReadNotificationUseCase(notificationRepository)

    const notification = new Notification({
      category: 'teste',
      content: new Content('test content'),
      recipientId: 'test_recipient_id'
    })

    await notificationRepository.create(notification)
    await readNotification.execute({ notificationId: notification.notification_id })

    expect(notificationRepository.notifications[0].readed).toEqual(expect.any(Date))
  })

  it('should not be able to read a notification when it does not exist', async () => {
    const notificationRepository = new NotificationInMemoryRepository()
    const readNotification = new ReadNotificationUseCase(notificationRepository)

    expect(async () => {
      return readNotification.execute({ notificationId: 'fake_notification_id' })
    }).rejects.toThrow(NotificationNotFoundError)
  })
})