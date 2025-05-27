import { Module } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductController } from "./product.controller";
import { PrismaService } from "src/prisma.service";

@Module({
  controllers: [ProductController],
  providers: [ProductService, PrismaService],
  exports: [ProductService], // <-- добавь экспорт здесь
})
export class ProductModule {}
