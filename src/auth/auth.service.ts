import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma.service';
import { AuthDto } from './dto/auth.dto';
import { ConfigService } from '@nestjs/config';
import { Response, Request } from 'express';

@Injectable()
export class AuthService {
  private readonly EXPIRE_DAY_REFRESH_TOKEN = 1;
  private readonly REFRESH_TOKENS_NAME = 'refreshtoken';

  constructor(
    private readonly jwt: JwtService,
    private readonly userService: UserService,
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async login(dto: AuthDto) {
    const user = await this.validateUser(dto);
    const tokens = this.issueTokens(user.id);
    return { user, ...tokens };
  }

  async register(dto: AuthDto) {
    const oldUser = await this.userService.getByEmail(dto.email);
    if (oldUser) {
      throw new BadRequestException('Пользователь уже существует');
    }
    const user = await this.userService.create(dto);
    const tokens = this.issueTokens(user.id);
    return { user, ...tokens };
  }

  async getNewTokens(refreshToken: string) {
    try {
      const result = await this.jwt.verifyAsync(refreshToken);
      if (!result) {
        throw new UnauthorizedException('Невалидный refresh токен');
      }
      const user = await this.userService.getById(result.id);
      const tokens = this.issueTokens(user.id);
      return { user, ...tokens };
    } catch (error) {
      throw new UnauthorizedException('Ошибка верификации refresh токена');
    }
  }

  issueTokens(userId: string) {
    const payload = { id: userId };

    const accessToken = this.jwt.sign(payload, {
      expiresIn: this.configService.get('JWT_ACCESS_EXPIRES') || '1h',
    });
    const refreshToken = this.jwt.sign(payload, {
      expiresIn: this.configService.get('JWT_REFRESH_EXPIRES') || '7d',
    });

    return { accessToken, refreshToken };
  }

  private async validateUser(dto: AuthDto) {
    const user = await this.userService.getByEmail(dto.email);
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }
    return user;
  }

  async validateOAuthLogin(
    req: Request & { user: { email: string; name: string; picture: string } },
  ): Promise<any> {
    try {
      let user = await this.userService.getByEmail(req.user.email);

      if (!user) {
        user = await this.prisma.user.create({
          data: {
            email: req.user.email,
            name: req.user.name,
            picture: req.user.picture,
          },
          include: {
            store: true,
            favorites: true,
            orders: true,
          },
        });
      }

      const tokens = this.issueTokens(user.id);
      return { user, ...tokens };
    } catch (error) {
      throw new UnauthorizedException('Ошибка при входе через OAuth');
    }
  }

  addRefreshTokenFromResponse(res: Response, refreshToken: string) {
    const expiresIn = new Date();
    expiresIn.setDate(expiresIn.getDate() + this.EXPIRE_DAY_REFRESH_TOKEN);

    res.cookie(this.REFRESH_TOKENS_NAME, refreshToken, {
      httpOnly: true,
      domain: this.configService.get('SERVER_DOMAIN'),
      expires: expiresIn,
      secure: true,
      sameSite: 'none',
    });
  }

  removeRefreshTokenFromResponse(res: Response) {
    res.cookie(this.REFRESH_TOKENS_NAME, '', {
      httpOnly: true,
      domain: this.configService.get('SERVER_DOMAIN'),
      expires: new Date(0),
      secure: true,
      sameSite: 'none',
    });
  }
}
