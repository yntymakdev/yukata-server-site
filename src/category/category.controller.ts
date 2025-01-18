import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { Auth } from "src/auth/decorators/auth-decorators";
import { CurrentUser } from "src/user/decorator/user.decorator";
import { CreateStoreDto } from "src/store/create-dto.store";
import { CategoryService } from "./category.service";
import { CategoryDto } from "./category.dto";

@Controller("category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Auth()
  @Get("by-Id/:Id")
  async getByStoreId(@Param("id") id: string) {
    return this.categoryService.getById(id);
  }
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Post(":storeId")
  async create(@Param("id") userId: string, @Body() dto: CategoryDto) {
    return this.categoryService.create(userId, dto);
  }
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Put(":id")
  async update(@Param("id") storeId: string, @Body() dto: CategoryDto) {
    return this.categoryService.update(storeId, dto);
  }
  @HttpCode(200)
  @Auth()
  @Delete(":id")
  async delete(@Param("id") id: string) {
    return this.categoryService.delete(id);
  }
}
