import { Injectable } from "@nestjs/common";
import { stringify } from "querystring";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}
  async getAll(searchTerm?: string) {
    if (searchTerm) return this.getSearchTermFilter(searchTerm);
    const product = await this.prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        category: true,
        color: true,
        reviews: true,
      },
    });
    return product;
  }
}
