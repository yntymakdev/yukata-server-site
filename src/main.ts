import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.enableCors({
    origin: [process.env.CLIENT_SITE],
    credentials: true,
    exposedHeaders: 'set-cookie',
  });

  const httpAdapter = app.getHttpAdapter();
  const router = httpAdapter.getInstance();

  router._router.stack.forEach((middleware) => {
    if (middleware.route) {
      const methods = Object.keys(middleware.route.methods)
        .map((method) => method.toUpperCase())
        .join(', ');
      console.log(`${methods} ${middleware.route.path}`);
    }
  });

  await app.listen(5000);
}
bootstrap();
