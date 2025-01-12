import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Сделаем конфигурацию доступной глобально
      envFilePath: '.env', // Указываем путь к файлу .env, если он есть
    }),
    AuthModule,
  ],
})
export class AppModule {}
