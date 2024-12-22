import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-instagram';

@Injectable()
export class InstagramStrategy extends PassportStrategy(Strategy, 'instagram') {
  constructor(private configService: ConfigService) {
    super({
      clientID: configService.get<string>('INSTAGRAM_CLIENT_ID'),
      clientSecret: configService.get<string>('INSTAGRAM_CLIENT_SECRET'),
      callbackURL:
        configService.get<string>('SERVER_URL') + '/auth/instagram/callback',
      scope: ['user_profile', 'user_media'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ) {
    const { displayName, emails, photos } = profile;
    const user = {
      email: emails ? emails[0].value : null,
      name: displayName,
      picture: photos ? photos[0].value : null,
    };
    done(null, user);
  }
}
