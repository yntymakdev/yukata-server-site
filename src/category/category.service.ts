import { Injectable, NotFoundException } from "@nestjs/common";
import { Category } from "@prisma/client";
import { PrismaService } from "src/prisma.service";
import { CategoryDto } from "./category.dto";

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async getByStoreId(storeId: string) {
    return this.prisma.category.findMany({
      where: {
        storeId,
      },
    });
  }
  async getById(id: string) {
    const category = await this.prisma.category.findUnique({
      where: {
        id,
      },
    });
    if (!category) throw new NotFoundException("Категория не надена");
    return category;
  }
  async create(storeId: string, dto: CategoryDto) {
    return this.prisma.category.create({
      data: { title: dto.title, description: dto.description, storeId },
    });
  }
  async update(id: string, dto: CategoryDto) {
    await this.getById(id);
    return this.prisma.category.update({
      where: { id },
      data: dto,
    });
  }
  async delete(id: string) {
    await this.getById(id);
    return this.prisma.category.delete({
      where: { id },
    });
  }
}
