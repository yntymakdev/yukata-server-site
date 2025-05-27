import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

import * as cookieParser from "cookie-parser";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { Logger } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.enableCors({
    origin: [process.env.CLIENT_URL],
    credentials: true,
    exposedHeaders: "set-cookie",
  });

  const config = new DocumentBuilder()
    .setTitle("CMS system of online shop ")
    .setDescription("API documentation for Nest course")
    .setVersion("1.0.0")
    .setContact("TeaCoder Team", "https://teacoder.ru", "support@teacoder.ru")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/docs", app, document);

  SwaggerModule.setup('/docs', app,document,{

    jsonDocumentUrl: 'swagger.json',
    customSiteTitle: 'Free Books of History Prophets | Docs'
  })
  const logger = new Logger('HTTP');
  app.use((req, res, next) => {
    logger.log(`${req.method} ${req.url}`);
    next();
  });

  await app.listen(5000);
}
bootstrap();
