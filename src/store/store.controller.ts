import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { StoreService } from "./store.service";
import { Auth } from "src/auth/decorators/auth-decorators";
import { CurrentUser } from "src/user/decorator/user.decorator";
import { CreateStoreDto } from "./create-dto.store";
import { UpdateStoreDto } from "./update-dto.store";

@Controller("store")
export class StoreController {
  constructor(private readonly storeService: StoreService) {}
  @Auth()
  @Get("by-id/:id")
  async getById(@Param("id") storeId: string, @CurrentUser("id") userId: string) {
    return this.storeService.getById(storeId, userId);
  }
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Post()
  async create(@CurrentUser("id") userId: string, @Body() dto: CreateStoreDto) {
    return this.storeService.create(userId, dto);
  }
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Put(":id")
  async update(@Param("id") storeId: string, @CurrentUser("id") userId: string, @Body() dto: UpdateStoreDto) {
    return this.storeService.create(userId, dto);
  }
  @Auth()
  @Delete()
  @Put(":id")
  async delete(@Param("id") storeId: string, @CurrentUser("id") userId: string) {
    return this.storeService.delete(userId, storeId);
  }
}
