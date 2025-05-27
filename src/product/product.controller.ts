import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";

import { ProductDto } from "./dto/product.dto";
import { ProductService } from "./product.service";
import { Auth } from "src/auth/decorators/auth-decorators";
import { ApiTags, ApiBearerAuth, ApiOperation, ApiQuery, ApiParam, ApiResponse } from "@nestjs/swagger";

@ApiTags("Продукты")
@ApiBearerAuth()
@Controller("products")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({ summary: "Получить все продукты", description: "Можно искать по названию" })
  @ApiQuery({ name: "searchTerm", required: false, description: "Поисковый термин" })
  @Get()
  async getAll(@Query("searchTerm") searchTerm?: string) {
    return this.productService.getAll(searchTerm);
  }

  @ApiOperation({ summary: "Получить продукты по магазину" })
  @ApiParam({ name: "storeId", description: "ID магазина" })
  @Auth()
  @Get("by-storeId/:storeId")
  async getByStoreId(@Param("storeId") storeId: string) {
    return this.productService.getByStoreId(storeId);
  }

  @ApiOperation({ summary: "Получить продукт по ID" })
  @ApiParam({ name: "id", description: "ID продукта" })
  @Get("by-id/:id")
  async getById(@Param("id") id: string) {
    return this.productService.getById(id);
  }

  @ApiOperation({ summary: "Получить продукты по категории" })
  @ApiParam({ name: "categoryId", description: "ID категории" })
  @Get("by-category/:categoryId")
  async getbyCategory(@Param("categoryId") categoryId: string) {
    return this.productService.getByCategory(categoryId);
  }

  @ApiOperation({ summary: "Получить самые популярные продукты" })
  @Get("most-popular")
  async getMostPopular() {
    return this.productService.getMostPopular();
  }

  @ApiOperation({ summary: "Получить похожие продукты" })
  @ApiParam({ name: "id", description: "ID продукта" })
  @Get("similar/:id")
  async getSimilar(@Param("id") id: string) {
    return this.productService.getSimilar(id);
  }

  @ApiOperation({ summary: "Создать продукт" })
  @ApiParam({ name: "storeId", description: "ID магазина" })
  @ApiResponse({ status: 200, description: "Продукт успешно создан" })
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Post(":storeId")
  async create(@Param("storeId") storeId: string, @Body() dto: ProductDto) {
    return this.productService.create(storeId, dto);
  }

  @ApiOperation({ summary: "Обновить продукт" })
  @ApiParam({ name: "id", description: "ID продукта" })
  @ApiResponse({ status: 200, description: "Продукт успешно обновлён" })
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Put(":id")
  async update(@Param("id") id: string, @Body() dto: ProductDto) {
    return this.productService.update(id, dto);
  }

  @ApiOperation({ summary: "Удалить продукт" })
  @ApiParam({ name: "id", description: "ID продукта" })
  @ApiResponse({ status: 200, description: "Продукт успешно удалён" })
  @HttpCode(200)
  @Auth()
  @Delete(":id")
  async delete(@Param("id") id: string) {
    return this.productService.delete(id);
  }
}
