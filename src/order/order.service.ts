import { YooCheckout } from "@a2seven/yoo-checkout";
import { Injectable } from "@nestjs/common";

const checkout = new YooCheckout({
  shopId: process.env["YOOKASSA_SHOP_ID"],
  secretKey: process.env["YOOKASSA_CE"],
});
@Injectable()
export class OrderService {}
