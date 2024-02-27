import { Content } from "./content"

describe('Notification Content', () => {
  it('should be possible to create notification content', () => {
    const content = new Content('You received a friend request')

    expect(content).toBeTruthy()
  })

  it('No should be possible to create notification content with less than 5 characters', () => {
    expect(() => new Content('test')).toThrow()
  })

  it('No should be possible to create notification content longer than 240 characters', () => {
    expect(() => new Content('test'.repeat(241))).toThrow()
  })
})