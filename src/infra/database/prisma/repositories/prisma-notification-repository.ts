import { Injectable } from "@nestjs/common";
import { Notification } from "@application/entities/notification/notification";
import { PrismaService } from "../prisma.service";
import { NotificationRepository } from "@application/repositories/notifications-repository";
import { PrismaNotificationMapper } from "../mappers/prisma-notification-mapper";

@Injectable()
export class PrismaNotificationRepository implements NotificationRepository {
  constructor(private prisma: PrismaService) { }

  async create(notification: Notification) {
    const raw = PrismaNotificationMapper.toPrisma(notification)

    await this.prisma.notification.create({
      data: raw
    })
  }

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = await this.prisma.notification.findUnique({
      where: { id: notificationId }
    })

    if (!notification)
      return null

    const raw = PrismaNotificationMapper.toDomain(notification)
    return raw
  }

  async save(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification)

    const r = await this.prisma.notification.update({
      where: { id: raw.id },
      data: raw
    })
  }

  async findCountByRecipientId(recipientId: string): Promise<number> {
    const count = await this.prisma.notification.count({
      where: { recipientId }
    })

    return count
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    const notifications = await this.prisma.notification.findMany({
      where: { recipientId }
    })

    return notifications.map(PrismaNotificationMapper.toDomain)
  }
}