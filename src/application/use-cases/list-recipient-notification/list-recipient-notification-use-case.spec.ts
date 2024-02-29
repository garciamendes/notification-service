import { NotificationInMemoryRepository } from "@test/in-memory-repository/notification-in-memory"
import { Content } from "@application/entities/content/content"
import { Notification } from "@application/entities/notification/notification"
import { ListRecipientNotificationUseCase } from "./list-recipient-notification-use-case"

describe('Find many recipient notifications', () => {
  it('should be possible find many recipient notifications', async () => {
    const notificationRepository = new NotificationInMemoryRepository()
    const listRecipientNotification = new ListRecipientNotificationUseCase(notificationRepository)

    const notification_1 = new Notification({
      category: 'test_1',
      content: new Content('test content'),
      recipientId: 'test_recipient_id'
    })

    const notification_2 = new Notification({
      category: 'test_2',
      content: new Content('test content'),
      recipientId: 'test_recipient_id'
    })

    const notification_3 = new Notification({
      category: 'test_3',
      content: new Content('test content'),
      recipientId: 'test_recipient_id_other'
    })

    await notificationRepository.create(notification_1)
    await notificationRepository.create(notification_2)
    await notificationRepository.create(notification_3)

    const { notifications } = await listRecipientNotification.execute({ recipientId: notification_1.recipientId })

    expect(notifications).toHaveLength(2)
    expect(notifications).toEqual(expect.arrayContaining([
      expect.objectContaining({ recipientId: 'test_recipient_id' }),
      expect.objectContaining({ recipientId: 'test_recipient_id' }),
    ]))
  })
})