import { Body, Controller, HttpCode, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { OrderService } from "./order.service";
import { Auth } from "src/auth/decorators/auth-decorators";
import { PaymentStatusDto } from "./dto/payment-dto";
import { CurrentUser } from "src/user/decorator/user.decorator";
import { OrderDto } from "./dto/order.dto";

@Controller("orders")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post("place")
  @Auth()
  async checkout(@Body() dto: OrderDto, @CurrentUser("id") userId: string) {
    return this.orderService.createPayment(dto, userId);
  }

  @HttpCode(200)
  @Post("status")
  async updateStatus(@Body() dto: PaymentStatusDto) {
    return this.orderService.updateStatus(dto);
  }
}
