import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { OrderStatus } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(data: {
    customerId: string;
    items: { productId: string; variantId?: string; quantity: number; price: number }[];
    shippingName?: string;
    shippingPhone?: string;
    shippingAddress?: string;
    shippingNote?: string;
    voucherId?: string;
    discountAmount?: number;
  }) {
    const totalAmount = data.items.reduce((sum, item) => sum + item.price * item.quantity, 0) - (data.discountAmount || 0);

    return this.prisma.order.create({
      data: {
        customerId: data.customerId,
        totalAmount,
        shippingName: data.shippingName,
        shippingPhone: data.shippingPhone,
        shippingAddress: data.shippingAddress,
        shippingNote: data.shippingNote,
        voucherId: data.voucherId,
        discountAmount: data.discountAmount || 0,
        items: {
          create: data.items.map((item) => ({
            productId: item.productId,
            variantId: item.variantId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: { items: { include: { product: true, variant: true } }, customer: true },
    });
  }

  async findAll(page = 1, limit = 20, status?: OrderStatus) {
    const where = status ? { status } : {};
    const [orders, total] = await Promise.all([
      this.prisma.order.findMany({
        where,
        include: { customer: true, items: { include: { product: true } } },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.order.count({ where }),
    ]);

    return { data: orders, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
  }

  async findById(id: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: { customer: true, items: { include: { product: true, variant: true } }, voucher: true },
    });
    if (!order) throw new NotFoundException('Đơn hàng không tồn tại');
    return order;
  }

  async updateStatus(id: string, status: OrderStatus) {
    await this.findById(id);
    return this.prisma.order.update({
      where: { id },
      data: { status },
      include: { customer: true, items: { include: { product: true } } },
    });
  }
}
