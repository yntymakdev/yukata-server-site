import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { Auth } from "src/auth/decorators/auth-decorators";
import { CurrentUser } from "src/user/decorator/user.decorator";
import { ColorService } from "./color.service";
import { CreateStoreDto } from "src/store/create-dto.store";
import { ColorDto } from "./dto/dto.color";

@Controller("colors")
export class StoreController {
  constructor(private readonly colorService: ColorService) {}
  @Auth()
  @Get("by-Id/:Id")
  async getByStoreId(@Param("id") id: string) {
    return this.colorService.getById(id);
  }
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Post(":storeId")
  async create(@Param("id") userId: string, @Body() dto: ColorDto) {
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
  async delete(@Param("id") storeId: string) {
    return this.colorService.delete(storeId, userId);
  }
}
