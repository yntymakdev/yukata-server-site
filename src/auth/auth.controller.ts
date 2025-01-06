import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  Res,
  UsePipes,
  ValidationPipe,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: AuthDto, @Res({ passthrough: true }) res: Response) {
    try {
      const { refreshToken, ...response } = await this.authService.login(dto);
      this.authService.addRefreshTokenFromResponse(res, refreshToken);
      return response;
    } catch (error) {
      throw new UnauthorizedException('Ошибка входа');
    }
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('register')
  async register(
    @Body() dto: AuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const { refreshToken, ...response } =
        await this.authService.register(dto);
      this.authService.addRefreshTokenFromResponse(res, refreshToken);
      return response;
    } catch (error) {
      throw new UnauthorizedException('Ошибка регистрации');
    }
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login/access-token')
  async getNewTokens(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshTokenFromCookies =
      req.cookies[this.authService.REFRESH_TOKENS_NAME];
    if (!refreshTokenFromCookies) {
      this.authService.removeRefreshTokenFromResponse(res);
      throw new UnauthorizedException('Refresh токен не прошел');
    }
    try {
      const { refreshToken, ...response } = await this.authService.getNewTokens(
        refreshTokenFromCookies,
      );
      this.authService.addRefreshTokenFromResponse(res, refreshToken);
      return response;
    } catch (error) {
      throw new UnauthorizedException('Ошибка получения новых токенов');
    }
  }

  @HttpCode(200)
  @Post('logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    this.authService.removeRefreshTokenFromResponse(res);
    return { success: true };
  }
}
