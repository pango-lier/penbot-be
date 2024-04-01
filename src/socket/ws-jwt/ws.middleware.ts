import { Socket } from 'socket.io';
type SocketIOMiddleware = {
  (client: Socket, next: (err?: Error) => void);
};

export const SocketAuthMiddleware = (): SocketIOMiddleware => {
  return (client, next) => {
    try {
      // WsJwtGuard.validateToken(client);
      next();
    } catch (error) {
      next(error);
    }
  };
};
