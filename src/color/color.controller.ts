import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { Auth } from "src/auth/decorators/auth-decorators";
import { CurrentUser } from "src/user/decorator/user.decorator";
import { ColorService } from "./color.service";

@Controller("colors")
export class StoreController {
  constructor(private readonly colorService: ColorService) {}
  @Auth()
  @Get("by-Id/:Id")
  async getByStoreId(@Param("id") storeId: string, @CurrentUser("id") userId: string) {
    return this.colorService.getById(storeId, userId);
  }
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Post()
  async create(@CurrentUser("id") userId: string, @Body() dto: CreateStoreDto) {
    return this.colorService.create(userId, dto);
  }
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Put(":id")
  async update(@Param("id") storeId: string, @CurrentUser("id") userId: string, @Body() dto: UpdateStoreDto) {
    return this.colorService.update(storeId, userId, dto);
  }
  @Auth()
  @Delete(":id")
  async delete(@Param("id") storeId: string, @CurrentUser("id") userId: string) {
    return this.colorService.delete(storeId, userId);
  }
}
