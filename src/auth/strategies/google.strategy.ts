import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, VerifyCallback } from 'passport-google-oauth20';
import { Strategy } from 'passport-jwt';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private configService: ConfigService) {
    super({
      clientId: configService.get('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
      callBackURL: configService.get('SERVER_URL') + '/auth/google/callback',
      scope: ['profile', 'email'],
    });
  }

  async validate(
    _accesssToken: string,
    _refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ) {
    const { displayName, emails, photos } = profile;
    const user = {
      email: emails[0].value,
      name: displayName,
      picture: photos[0].value,
    };
    done(null, user);
  }
}
