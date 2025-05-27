import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { Auth } from "src/auth/decorators/auth-decorators";
import { ColorService } from "./color.service";
import { ColorDto } from "./dto/dto.color";
import { ApiTags, ApiBearerAuth, ApiOperation, ApiParam, ApiBody, ApiResponse } from "@nestjs/swagger";

@ApiTags("Цвета")
@ApiBearerAuth()
@Controller("colors")
export class ColorController {
  constructor(private readonly colorService: ColorService) {}

  @Auth()
  @ApiOperation({ summary: "Получить все цвета по storeId" })
  @ApiParam({ name: "storeId", description: "ID магазина" })
  @ApiResponse({ status: 200, description: "Успешно получен список цветов" })
  @Get("by-storeId/:storeId")
  async getByStoreId(@Param("storeId") storeId: string) {
    return this.colorService.getByStoreId(storeId);
  }

  @Auth()
  @ApiOperation({ summary: "Получить цвет по ID" })
  @ApiParam({ name: "id", description: "ID цвета" })
  @ApiResponse({ status: 200, description: "Успешно получен цвет" })
  @Get("by-id/:id")
  async getById(@Param("id") id: string) {
    return this.colorService.getById(id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @ApiOperation({ summary: "Создать цвет" })
  @ApiParam({ name: "storeId", description: "ID магазина, к которому относится цвет" })
  @ApiBody({ type: ColorDto, description: "Данные для создания цвета" })
  @ApiResponse({ status: 200, description: "Цвет успешно создан" })
  @Post(":storeId")
  async create(@Param("storeId") storeId: string, @Body() dto: ColorDto) {
    return this.colorService.create(storeId, dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @ApiOperation({ summary: "Обновить цвет" })
  @ApiParam({ name: "id", description: "ID цвета для обновления" })
  @ApiBody({ type: ColorDto, description: "Новые данные цвета" })
  @ApiResponse({ status: 200, description: "Цвет успешно обновлен" })
  @Put(":id")
  async update(@Param("id") id: string, @Body() dto: ColorDto) {
    return this.colorService.update(id, dto);
  }

  @HttpCode(200)
  @Auth()
  @ApiOperation({ summary: "Удалить цвет" })
  @ApiParam({ name: "id", description: "ID цвета для удаления" })
  @ApiResponse({ status: 200, description: "Цвет успешно удален" })
  @Delete(":id")
  async delete(@Param("id") id: string) {
    return this.colorService.delete(id);
  }
}
