import { Body, Controller, HttpCode, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { OrderService } from "./order.service";
import { Auth } from "src/auth/decorators/auth-decorators";
import { PaymentStatusDto } from "./dto/payment-dto";
import { CurrentUser } from "src/user/decorator/user.decorator";
import { OrderDto } from "./dto/order.dto";
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from "@nestjs/swagger";

@ApiTags("Заказы")
@Controller("orders")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({
    summary: "Оформление заказа",
    description: "Создаёт новый заказ и запускает процесс оплаты",
  })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: "Заказ успешно создан" })
  @ApiResponse({ status: 400, description: "Ошибка валидации данных заказа" })
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post("place")
  @Auth()
  async checkout(@Body() dto: OrderDto, @CurrentUser("id") userId: string) {
    return this.orderService.createPayment(dto, userId);
  }

  @ApiOperation({
    summary: "Обновление статуса оплаты",
    description: "Обновляет статус оплаты по заказу на основании переданных данных",
  })
  @ApiResponse({ status: 200, description: "Статус успешно обновлён" })
  @ApiResponse({ status: 400, description: "Некорректные данные для обновления статуса" })
  @HttpCode(200)
  @Post("status")
  async updateStatus(@Body() dto: PaymentStatusDto) {
    return this.orderService.updateStatus(dto);
  }
}
