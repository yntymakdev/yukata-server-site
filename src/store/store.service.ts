import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateStoreDto } from "./create-dto.store";
import { UpdateStoreDto } from "./update-dto.store";

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

  async create(userId: string, dto: CreateStoreDto) {
    return this.prisma.store.create({
      data: {
        title: dto.title,
        userId,
      },
    });
  }
  async update(storeId: string, userId: string, dto: UpdateStoreDto) {
    await this.getById(userId, storeId);
    return this.prisma.store.update({
      where: { id: storeId },
      data: {
        title: dto.title,
        userId,
      },
    });
  }
  async delete(storeId: string, userId: string) {
    await this.getById(userId, storeId);
    return this.prisma.store.delete({
      where: { id: storeId },
    });
  }
}
