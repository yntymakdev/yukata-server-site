import { Controller, Get, Param, Patch } from "@nestjs/common";
import { UserService } from "./user.service";
import { Auth } from "src/auth/decorators/auth-decorators";
import { CurrentUser } from "./decorator/user.decorator";
import { ApiOperation, ApiTags, ApiParam, ApiOkResponse, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { UserDto } from "./dto/user.dto";

@ApiTags("User")
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Auth()
  @Get("profile")
  @ApiOperation({ summary: "Получить профиль текущего пользователя" })
  @ApiOkResponse({
    description: "Профиль пользователя успешно получен",
    type: UserDto,
  })
  @ApiUnauthorizedResponse({ description: "Пользователь не авторизован" })
  async getProfile(@CurrentUser("id") id: string) {
    return this.userService.getById(id);
  }

  @Auth()
  @Patch("profile/favorites/:productId")
  @ApiOperation({ summary: "Добавить или удалить товар из избранного" })
  @ApiParam({
    name: "productId",
    description: "ID продукта, который нужно добавить или удалить из избранного",
    example: "product123",
  })
  @ApiOkResponse({
    description: "Избранное успешно обновлено",
    type: UserDto,
  })
  @ApiUnauthorizedResponse({ description: "Пользователь не авторизован" })
  async toggleFavorites(@CurrentUser("id") userId: string, @Param("productId") productId: string) {
    return this.userService.toggleFavorite(productId, userId);
  }
}
