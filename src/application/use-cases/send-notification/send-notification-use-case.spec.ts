import { NotificationInMemoryRepository } from "@test/in-memory-repository/notification-in-memory"
import { SendNotification } from "./send-notification-use-case"

describe('Send Notification', () => {
  it('should be possible to send a notification', async () => {
    const notificationRepository = new NotificationInMemoryRepository()
    const sendNotification = new SendNotification(notificationRepository)

    const { notification } = await sendNotification.execute({
      category: 'test',
      content: 'test content',
      recipientId: 'test_123'
    })

    expect(notificationRepository.notifications).toHaveLength(1)
    expect(notificationRepository.notifications[0]).toEqual(notification)
  })
})