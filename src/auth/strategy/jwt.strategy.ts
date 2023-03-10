import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../interface/jwt-payload.interface';
import { ICurrentUser } from '../interface/authenticated-user.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('jwt.accessToken.secret'),
    });
  }

  async validate(payload: any) {
    const user: ICurrentUser = {
      id: payload.sub,
      username: payload?.username || null,
      name: payload?.name || null,
      email: payload?.email || null,
    };
    return user;
  }
}
