import { Injectable } from "@nestjs/common";
import { Notification } from "@application/entities/notification/notification";
import { PrismaService } from "../prisma.service";
import { NotificationRepository } from "@application/repositories/notifications-repository";
import { PrismaNotificationMapper } from "../mappers/prisma-notification-mapper";

@Injectable()
export class PrismaNotificationRepository implements NotificationRepository {
  constructor(private prismaService: PrismaService) { }

  async create(notification: Notification) {
    const raw = PrismaNotificationMapper.toPrisma(notification)

    await this.prismaService.notification.create({
      data: raw
    })
  }

  async findById(notificationId: string): Promise<Notification | null> {
    // const notification = await this.prismaService.notification.findUnique({
    //   where: { id: notificationId }
    // })

    // if (!notification)
    //   return null

    // return notification
    throw new Error("Method not implemented.");
  }

  async save(notification: Notification): Promise<void> {
    throw new Error("Method not implemented.");
  }
}