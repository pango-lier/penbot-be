import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Socket } from 'socket.io';

@Injectable()
export class WsJwtGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    if (context.getType() !== 'ws') {
      return true;
    }
    const client: Socket = context.switchToWs().getClient();
    const { authorization } = client.handshake.auth;
    this.validateToken(client, authorization);
    return true;
  }

  validateToken(client: Socket, authorization: string) {
    const token = this.extractTokenFromHeader(authorization);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = this.jwtService.verify(token);
      client['user'] = payload;
      return payload;
    } catch {
      throw new UnauthorizedException();
    }
  }

  private extractTokenFromHeader(authorization: string): string | undefined {
    if (!authorization) {
      throw new UnauthorizedException();
    }
    const [type, token] = authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
