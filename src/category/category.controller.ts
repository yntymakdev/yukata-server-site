import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { Auth } from "src/auth/decorators/auth-decorators";
import { CurrentUser } from "src/user/decorator/user.decorator";
import { CreateStoreDto } from "src/store/create-dto.store";
import { CategoryService } from "./category.service";
import { CategoryDto } from "./category.dto";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("Категории")
@ApiBearerAuth()
@Controller("category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Auth()
  @ApiOperation({ summary: "Получить список категорий по ID магазина" })
  @ApiParam({ name: "storeId", description: "ID магазина" })
  @ApiResponse({ status: 200, description: "Успешно получен список категорий" })
  @Get("by-storeId/:storeId")
  async getByStoreId(@Param("storeId") id: string) {
    return this.categoryService.getByStoreId(id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @ApiOperation({ summary: "Создать категорию" })
  @ApiParam({ name: "storeId", description: "ID магазина, к которому относится категория" })
  @ApiBody({ type: CategoryDto, description: "Данные новой категории" })
  @ApiResponse({ status: 200, description: "Категория успешно создана" })
  @Post(":storeId")
  async create(@Param("storeId") storeId: string, @Body() dto: CategoryDto) {
    return this.categoryService.create(storeId, dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @ApiOperation({ summary: "Обновить категорию" })
  @ApiParam({ name: "id", description: "ID категории для обновления" })
  @ApiBody({ type: CategoryDto, description: "Обновлённые данные категории" })
  @ApiResponse({ status: 200, description: "Категория успешно обновлена" })
  @Put(":id")
  async update(@Param("id") categoryId: string, @Body() dto: CategoryDto) {
    return this.categoryService.update(categoryId, dto);
  }

  @HttpCode(200)
  @Auth()
  @ApiOperation({ summary: "Удалить категорию" })
  @ApiParam({ name: "id", description: "ID категории для удаления" })
  @ApiResponse({ status: 200, description: "Категория успешно удалена" })
  @Delete(":id")
  async delete(@Param("id") id: string) {
    return this.categoryService.delete(id);
  }
}
