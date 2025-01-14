import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class StoreService {
  constructor(private prisma: PrismaService) {}
  async getById(storeId: string, userId: string) {
    const store = await this.prisma.store.findUnique({
      where: {
        id: storeId,
        userId,
      },
    });
    if (!store) throw new NotFoundException("Магазин не наден или вы не являетесь его владельцем ");
    return store;
  }
}
