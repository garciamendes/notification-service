import { Content } from "../content/content"
import { Notification } from "./notification"

describe('Notification', () => {
  it('should be possible to create a notification', () => {
    const notification = new Notification({
      recipientId: 'test',
      category: 'test',
      content: new Content('test cretead'),
    })

    expect(notification).toBeTruthy()
  })
})