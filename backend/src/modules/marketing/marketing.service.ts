import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class MarketingService {
  constructor(private prisma: PrismaService) {}

  async createVoucher(data: { code: string; discountType: 'PERCENTAGE' | 'FIXED'; discountValue: number; minOrderValue?: number; maxDiscount?: number; usageLimit?: number; expiredAt?: string }) {
    return this.prisma.voucher.create({
      data: { ...data, expiredAt: data.expiredAt ? new Date(data.expiredAt) : undefined },
    });
  }

  async findAllVouchers() {
    return this.prisma.voucher.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async findVoucherByCode(code: string) {
    const voucher = await this.prisma.voucher.findUnique({ where: { code } });
    if (!voucher) throw new NotFoundException('Mã voucher không tồn tại');
    return voucher;
  }

  async updateVoucher(id: string, data: any) {
    return this.prisma.voucher.update({ where: { id }, data });
  }

  async deleteVoucher(id: string) {
    return this.prisma.voucher.delete({ where: { id } });
  }

  async validateVoucher(code: string, orderTotal: number) {
    const voucher = await this.prisma.voucher.findUnique({ where: { code } });
    if (!voucher) return { valid: false, message: 'Mã voucher không tồn tại' };
    if (!voucher.isActive) return { valid: false, message: 'Mã voucher đã hết hiệu lực' };
    if (voucher.expiredAt && voucher.expiredAt < new Date()) return { valid: false, message: 'Mã voucher đã hết hạn' };
    if (voucher.usageLimit && voucher.usedCount >= voucher.usageLimit) return { valid: false, message: 'Mã voucher đã hết lượt sử dụng' };
    if (voucher.minOrderValue && orderTotal < voucher.minOrderValue) return { valid: false, message: `Đơn hàng tối thiểu ${voucher.minOrderValue.toLocaleString()}₫` };

    let discount = 0;
    if (voucher.discountType === 'PERCENTAGE') {
      discount = orderTotal * voucher.discountValue / 100;
      if (voucher.maxDiscount && discount > voucher.maxDiscount) discount = voucher.maxDiscount;
    } else {
      discount = voucher.discountValue;
    }

    return { valid: true, discount, voucher };
  }
}
