import { Body, Controller, Delete, Get, HttpCode, Param, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { ReviewService } from "./review.service";
import { Auth } from "src/auth/decorators/auth-decorators";
import { CurrentUser } from "src/user/decorator/user.decorator";
import { ReviewDto } from "./dto/review-dto";
import { ApiTags, ApiBearerAuth, ApiOperation, ApiParam, ApiBody, ApiResponse } from "@nestjs/swagger";

@ApiTags("Отзывы")
@ApiBearerAuth()
@Controller("reviews")
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Auth()
  @ApiOperation({ summary: "Получить отзывы по storeId" })
  @ApiParam({ name: "storeId", description: "ID магазина" })
  @ApiResponse({ status: 200, description: "Список отзывов успешно получен" })
  @Get("by-storeId/:storeId")
  async getByStoreId(@Param("storeId") storeId: string) {
    return this.reviewService.getByStoreId(storeId);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @ApiOperation({ summary: "Создать отзыв" })
  @ApiParam({ name: "productId", description: "ID продукта" })
  @ApiParam({ name: "storeId", description: "ID магазина" })
  @ApiBody({ type: ReviewDto, description: "Данные нового отзыва" })
  @ApiResponse({ status: 200, description: "Отзыв успешно создан" })
  @Post(":productId/:storeId")
  async create(
    @CurrentUser("id") userId: string,
    @Param("productId") productId: string,
    @Param("storeId") storeId: string,
    @Body() dto: ReviewDto
  ) {
    return this.reviewService.create(userId, productId, storeId, dto);
  }

  @HttpCode(200)
  @Auth()
  @ApiOperation({ summary: "Удалить отзыв" })
  @ApiParam({ name: "id", description: "ID отзыва" })
  @ApiResponse({ status: 200, description: "Отзыв успешно удален" })
  @Delete(":id")
  async delete(@Param("id") id: string, @CurrentUser("id") userId: string) {
    return this.reviewService.delete(id, userId);
  }
}
