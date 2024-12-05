import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';
import { Request } from 'express';
import { TokenPayload } from '../interfaces/token-payload.interface';
import { ConfigService } from '@nestjs/config';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly userService: UsersService,
  ) {
    console.log(configService.get('JWT_SECRET'));
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => request?.cookies?.Authentication,
      ]),

      secretOrKey: configService.get<string>('JWT_SECRET') as string,
    });
  }

  async validate({ userId }: TokenPayload) {
    return this.userService.getUser({ _id: userId });
  }
}
