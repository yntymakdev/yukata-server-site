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
  Get,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { Response, Request } from 'express'; // Импортируем Request и Response из express

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
    @Req() req: Request, // Используем Request из express
    @Res({ passthrough: true }) res: Response,
  ) {
    // Теперь можно использовать req.cookies
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

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() _req) {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthCallback(
    @Req() req,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { refreshToken, ...response } =
      await this.authService.validateOAuthLogin(req);
    this.authService.addRefreshTokenFromResponse(res, refreshToken);
    return res.redirect(
      `${process.env['CLIENT_URL']}/dashboard?accessToken=${response.accessToken}`,
    );
  }

  @Get('yandex')
  @UseGuards(AuthGuard('yandex'))
  async yandexAuth(@Req() _req) {}

  @Get('yandex/callback')
  @UseGuards(AuthGuard('yandex'))
  async yandexAuthCallback(
    @Req() req,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { refreshToken, ...response } =
      await this.authService.validateOAuthLogin(req);
    this.authService.addRefreshTokenFromResponse(res, refreshToken);
    return res.redirect(
      `${process.env['CLIENT_URL']}/dashboard?accessToken=${response.accessToken}`,
    );
  }
}
