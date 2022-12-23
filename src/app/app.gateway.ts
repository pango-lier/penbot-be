import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(6002, { transports: ['websocket'], cors: true })
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger: Logger = new Logger('AppGateway');
  //  @WebSocketServer() wss: Server;

  afterInit(server: Server) {
    this.logger.debug('GatewayInit');
  }

  handleDisconnect(client: Socket) {
    this.logger.debug(`handleDisconnect ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.debug(`handleConnection ${client.id}`);
  }

  @SubscribeMessage('newUser')
  handleMessage(client: Socket, payload: any): string {
    console.log(payload);
    return 'Hello world!';
  }
}
