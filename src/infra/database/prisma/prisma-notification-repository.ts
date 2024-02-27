import { Injectable } from "@nestjs/common";
import { Notification } from "../../../application/entities/notification";
import { NotificationRepository } from "../../../application/repositories/notifications-repository";
import { PrismaService } from "./prisma.service";

@Injectable()
export class PrismaNotificationRepository implements NotificationRepository {
  constructor(private prismaService: PrismaService) {}

  async create(notification: Notification) {
    await this.prismaService.notification.create({
      data: {
        category: notification.category,
        content: notification.content.value,
        recipientId: notification.recipientId,
        readed: notification.readed
      }
    })
  }
}