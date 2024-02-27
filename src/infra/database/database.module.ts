import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { NotificationRepository } from "src/application/repositories/notifications-repository";
import { PrismaNotificationRepository } from "./prisma/prisma-notification-repository";

@Module({
  providers: [
    PrismaService,
    {
      provide: NotificationRepository,
      useClass: PrismaNotificationRepository
    }
  ],
  exports: [
    NotificationRepository
  ]
})
export class DatabaseModule {}