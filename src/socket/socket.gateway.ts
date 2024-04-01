import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketPrivateDataDto } from './dto/socket-private-data.dto';
import { SocketPublishDataDto } from './dto/socket-publish-data.dto';
import { SubscribeMessageEnum } from './enum/socket-subscribe-message.enum';
import { SocketManagerOnlineService } from './socket-manager-online.service';
import { SocketService } from './socket.service';
import WsDeSocket from './ws-jwt/ws-de-socket';

@WebSocketGateway(6002, { transports: ['websocket'], cors: true })
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  private logger: Logger = new Logger('AppGateway');
  constructor(
    private readonly useOnline: SocketManagerOnlineService,
    private readonly socketService: SocketService,
  ) {}

  handleDisconnect(client: Socket) {
    return this.useOnline.removeSocket(client.id);
  }

  handleConnection() {
    return true;
  }

  @SubscribeMessage(SubscribeMessageEnum.Whoami)
  async whoami(client: Socket, { en }) {
    try {
      const ws = new WsDeSocket();
      const { user } = ws.de(en);
      await this.useOnline.addUser(client.id, user);
      this.socketService.sendNotificationCount([user], 'get');
      return true;
    } catch (error) {}
    return false;
  }

  @SubscribeMessage(SubscribeMessageEnum.ResetNotificationCount)
  async resetNotificationCount(client: Socket) {
    const user = await this.useOnline.getUser(client.id);
    this.socketService.sendNotificationCount([user.user], 'clear');
  }

  @SubscribeMessage(SubscribeMessageEnum.UserOut)
  userLogout(client: Socket) {
    return this.useOnline.removeSocket(client.id);
  }

  @SubscribeMessage(SubscribeMessageEnum.Echo)
  async echo(client: Socket, payload: SocketPrivateDataDto) {
    const socketIds = await this.useOnline.getSocketIds(
      payload.receivers?.map((i) => `${i.id}`),
    );
    return client.to(socketIds).emit(SubscribeMessageEnum.Echo, payload);
  }

  @SubscribeMessage(SubscribeMessageEnum.EchoGlobal)
  global(client: Socket, payload: SocketPublishDataDto) {
    return client.emit(SubscribeMessageEnum.EchoGlobal, payload);
  }

  @SubscribeMessage(SubscribeMessageEnum.SendPrivateData)
  async syncPayloadPrivate(client: Socket, payload: SocketPrivateDataDto) {
    return this.socketService.sendPrivate(payload);
  }

  @SubscribeMessage(SubscribeMessageEnum.SendPublishData)
  async syncPayloadPublish(client: Socket, payload: SocketPublishDataDto) {
    return this.socketService.sendPublish(payload);
  }

  @SubscribeMessage(SubscribeMessageEnum.ToastPrivate)
  async toastPrivate(client: Socket, payload: SocketPrivateDataDto) {
    return this.socketService.createToastPrivate(
      payload.notification,
      payload.receivers,
      payload.saveNotification,
    );
  }

  @SubscribeMessage(SubscribeMessageEnum.ToastPublish)
  async toastPublish(client: Socket, payload: SocketPublishDataDto) {
    return this.socketService.createToastPublish(
      payload.notification,
      payload.saveNotification,
    );
  }
}
