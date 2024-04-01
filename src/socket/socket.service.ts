import { Injectable, Logger } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { CreateNotificationDto } from '@notifications/dto/create-notification.dto';
import { NotificationGroupEnum } from '@notifications/enums/notification-group.enum';
import { NotificationsService } from '@notifications/notifications.service';
import { Server } from 'socket.io';
import { SocketPrivateDataDto } from './dto/socket-private-data.dto';
import { SocketPublishDataDto } from './dto/socket-publish-data.dto';
import { SocketTypeEnum } from './enum/socket-type.enum';
import { SocketManagerOnlineService } from './socket-manager-online.service';
import { SocketNotificationCountService } from './socket-notification-count.service';
import { User } from '@users/entities/user.entity';

@Injectable()
@WebSocketGateway(6002, { transports: ['websocket'], cors: true })
export class SocketService {
  private logger: Logger = new Logger('SocketService');
  @WebSocketServer()
  server: Server;
  constructor(
    private readonly onlineService: SocketManagerOnlineService,
    private readonly notificationService: NotificationsService,
    private readonly notificationCount: SocketNotificationCountService,
  ) {}

  async sendNotificationCount(
    receivers: Partial<User>[],
    type: 'inc' | 'get' | 'clear' = 'inc',
  ) {
    if (receivers) {
      for (const receiver of receivers) {
        if (receiver.id) {
          try {
            const count = await this.notificationCount[type](`${receiver.id}`);
            const socketIds = await this.onlineService.getSocketIds([
              `${receiver.id}`,
            ]);
            this.server
              .to(socketIds)
              .emit(SocketTypeEnum.notification_count, { count });
          } catch (error) {
            this.logger.error(`sendNotificationCount :${error?.message}`);
          }
        }
      }
    }
  }

  async saveNotification(notification: CreateNotificationDto) {
    this.sendNotificationCount(notification?.receivers);
    this.notificationService.create(notification);
  }

  async sendPrivate(payload: SocketPrivateDataDto) {
    const { notification, channel, saveNotification } = payload;
    const socketIds = await this.onlineService.getSocketIds(
      payload.receivers?.map((i) => `${i.id}`),
    );

    if (socketIds?.length > 0) this.server.to(socketIds).emit(channel, payload);
    if (notification) {
      if (socketIds?.length > 0)
        this.server
          .to(socketIds)
          .emit(SocketTypeEnum.toast, { notification: payload.notification });
      if (saveNotification === true) {
        notification.receivers = payload.receivers;
        notification.action = payload.action;
        this.saveNotification(notification);
      }
    }
    return true;
  }

  async sendPublish(payload: SocketPublishDataDto) {
    const { notification, channel, saveNotification } = payload;
    this.server.emit(channel, payload);
    if (notification) {
      this.server.emit(SocketTypeEnum.toast, {
        notification: payload.notification,
      });
      if (saveNotification === true) {
        notification.channel = NotificationGroupEnum.public;
        notification.action = payload.action;
        this.saveNotification(notification);
      }
    }
    return true;
  }

  async createToastPrivate(
    notification: CreateNotificationDto,
    receivers: User[],
    saveNotification = true,
  ) {
    notification.receivers = receivers;
    try {
      const socketIds = await this.onlineService.getSocketIds(
        receivers.map((i) => `${i.id}`),
      );
      if (socketIds?.length > 0) {
        this.server.to(socketIds).emit(SocketTypeEnum.toast, { notification });
      }
    } catch (error) {
      this.logger.error(`createToastPrivate :${error?.message}`);
    }
    if (saveNotification === true) this.saveNotification(notification);
  }

  async createToastPublish(
    notification: CreateNotificationDto,
    saveNotification = true,
  ) {
    notification.channel = NotificationGroupEnum.public;
    this.server.emit(SocketTypeEnum.toast, { notification });
    if (saveNotification === true) this.saveNotification(notification);
  }
}
