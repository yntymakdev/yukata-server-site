import { Injectable, NotFoundException } from "@nestjs/common";
import { Color } from "@prisma/client";
import { PrismaService } from "src/prisma.service";
import { ColorDto } from "./dto/dto.color";

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
  async create(storeId: string, dto: ColorDto) {
    return this.prisma.store.create({
      data: { name: dto.name, value: dto.value, storeId },
    });
  }
  async update(id: string, dto: ColorDto) {
    await this.getById(id);
    return this.prisma.store.update({
      where: { id: storeId },
      data: { ...dto, userId },
    });
  }
}
