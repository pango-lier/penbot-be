import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { NotificationsModule } from '@notifications/notifications.module';
import { SocketManagerOnlineService } from './socket-manager-online.service';
import { SocketNotificationCountService } from './socket-notification-count.service';
import { SocketGateway } from './socket.gateway';
import { SocketService } from './socket.service';
import { WsJwtGuard } from './ws-jwt/ws-jwt.guard';

@Global()
@Module({
  imports: [
    NotificationsModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('jwt.secret'),
        signOptions: {
          expiresIn: config.get<string | number>('jwt.expireTime'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    SocketGateway,
    SocketManagerOnlineService,
    SocketService,
    SocketNotificationCountService,
    WsJwtGuard,
  ],
  exports: [SocketService],
})
export class SocketModule {}
