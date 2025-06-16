import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract from Authorization: Bearer <token>
      ignoreExpiration: false,
      secretOrKey: 'your_jwt_secret', // Ideally use process.env.JWT_SECRET
    });
  }

  async validate(payload: any) {
    // This sets req.user = payload
    return { userId: payload.sub, username: payload.username , role: payload.role };
  }
}
