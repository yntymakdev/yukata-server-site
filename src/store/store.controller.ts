import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { StoreService } from "./store.service";
import { Auth } from "src/auth/decorators/auth-decorators";
import { CurrentUser } from "src/user/decorator/user.decorator";
import { CreateStoreDto } from "./create-dto.store";
import { UpdateStoreDto } from "./update-dto.store";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("Store")
@ApiBearerAuth()
@Controller("store")
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Auth()
  @Get("by-id/:id")
  @ApiOperation({ summary: "Получить магазин по ID" })
  @ApiParam({ name: "id", example: "store123", description: "ID магазина" })
  @ApiResponse({ status: 200, description: "Успешно получен магазин" })
  @ApiResponse({ status: 401, description: "Неавторизован" })
  async getById(@Param("id") storeId: string, @CurrentUser("id") userId: string) {
    return this.storeService.getById(storeId, userId);
  }

  @Auth()
  @Post()
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @ApiOperation({ summary: "Создать новый магазин" })
  @ApiBody({ type: CreateStoreDto })
  @ApiResponse({ status: 200, description: "Магазин успешно создан" })
  @ApiResponse({ status: 400, description: "Ошибка валидации" })
  @ApiResponse({ status: 401, description: "Неавторизован" })
  async create(@CurrentUser("id") userId: string, @Body() dto: CreateStoreDto) {
    return this.storeService.create(userId, dto);
  }

  @Auth()
  @Put(":id")
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @ApiOperation({ summary: "Обновить магазин" })
  @ApiParam({ name: "id", example: "store123", description: "ID магазина" })
  @ApiBody({ type: UpdateStoreDto })
  @ApiResponse({ status: 200, description: "Магазин успешно обновлен" })
  @ApiResponse({ status: 401, description: "Неавторизован" })
  async update(@Param("id") storeId: string, @CurrentUser("id") userId: string, @Body() dto: UpdateStoreDto) {
    return this.storeService.update(storeId, userId, dto);
  }

  @Auth()
  @Delete(":id")
  @ApiOperation({ summary: "Удалить магазин" })
  @ApiParam({ name: "id", example: "store123", description: "ID магазина" })
  @ApiResponse({ status: 200, description: "Магазин успешно удален" })
  @ApiResponse({ status: 401, description: "Неавторизован" })
  async delete(@Param("id") storeId: string, @CurrentUser("id") userId: string) {
    return this.storeService.delete(storeId, userId);
  }
}
