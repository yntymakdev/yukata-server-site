import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class ColorService {
  constructor(private prisma: PrismaService) {}

  async getByStoreId(storeId: string) {
    return this.prisma.color.findMany({
      where: {
        storeId,
      },
    });
  }
  async getById(id: string) {
    const color = await this.prisma.color.findUnique({
      where: {
        id,
      },
    });
    if (!color) throw new NotFoundException("Цвет не наден");
    return color;
  }
}
