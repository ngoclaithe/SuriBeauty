import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  async create(data: { name: string; phone?: string; email?: string; address?: string; note?: string }) {
    return this.prisma.customer.create({ data });
  }

  async findAll(page = 1, limit = 20, search?: string) {
    const where = search
      ? { OR: [{ name: { contains: search, mode: 'insensitive' as const } }, { phone: { contains: search } }, { email: { contains: search, mode: 'insensitive' as const } }] }
      : {};

    const [customers, total] = await Promise.all([
      this.prisma.customer.findMany({
        where,
        include: { _count: { select: { orders: true } } },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.customer.count({ where }),
    ]);

    return { data: customers, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
  }

  async findById(id: string) {
    return this.prisma.customer.findUnique({
      where: { id },
      include: { orders: { include: { items: { include: { product: true } } }, orderBy: { createdAt: 'desc' } } },
    });
  }
}
