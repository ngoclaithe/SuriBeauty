import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(data: { name: string; slug: string; image?: string; parentId?: string }) {
    return this.prisma.category.create({
      data,
      include: { parent: true, children: true },
    });
  }

  async findAll() {
    return this.prisma.category.findMany({
      include: { parent: true, children: true, _count: { select: { products: true } } },
      orderBy: { name: 'asc' },
    });
  }

  async findBySlug(slug: string) {
    const category = await this.prisma.category.findUnique({
      where: { slug },
      include: { children: true, products: { where: { status: 'ACTIVE' }, take: 20 } },
    });
    if (!category) throw new NotFoundException('Danh mục không tồn tại');
    return category;
  }

  async update(id: string, data: { name?: string; slug?: string; image?: string; parentId?: string }) {
    return this.prisma.category.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.category.delete({ where: { id } });
  }
}
