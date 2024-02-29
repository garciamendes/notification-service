import { Replace } from "@helpers/Replace"
import { Content } from "../content/content"

export interface NotificationProps {
  id?: string
  recipientId: string
  content: Content
  category: string
  readed?: Date | null
  created: Date
  canceled?: Date | null
}

export class Notification {
  private props: NotificationProps

  constructor(props: Replace<NotificationProps, { created?: Date }>) {
    this.props = {
      ...props,
      created: props.created ?? new Date()
    }
  }

  public get notification_id() : string {
    return this.props.id as string
  }

  public set recipientId(recipientId: string) {
    this.props.recipientId = recipientId
  }

  public get recipientId(): string {
    return this.props.recipientId
  }

  public set content(content: Content) {
    this.props.content = content
  }

  public get content(): Content {
    return this.props.content
  }

  public set category(category: string) {
    this.props.category = category
  }

  public get category(): string {
    return this.props.category
  }

  public set readed(readed: Date | null | undefined) {
    this.props.readed = readed
  }

  public get readed(): Date | null | undefined {
    return this.props.readed
  }

  public get created(): Date {
    return this.props.created
  }

  public get canceled(): Date | null | undefined {
    return this.props.canceled
  }

  public cancel() {
    this.props.canceled = new Date()
  }

  public read() {
    this.props.readed = new Date()
  }

  public unRead() {
    this.props.readed = null
  }
}