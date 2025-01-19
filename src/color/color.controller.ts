import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { Auth } from "src/auth/decorators/auth-decorators";
import { CurrentUser } from "src/user/decorator/user.decorator";
import { ColorService } from "./color.service";
import { CreateStoreDto } from "src/store/create-dto.store";
import { ColorDto } from "./dto/dto.color";

@Controller("colors")
export class ColorController {
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
  async update(@Param("id") storeId: string, @Body() dto: ColorDto) {
    return this.colorService.update(storeId, dto);
  }
  @HttpCode(200)
  @Auth()
  @Delete(":id")
  async delete(@Param("id") id: string) {
    return this.colorService.delete(id);
  }
}
