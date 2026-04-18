import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { MarketingService } from './marketing.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('vouchers')
export class MarketingController {
  constructor(private marketingService: MarketingService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() { return this.marketingService.findAllVouchers(); }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() body: any) { return this.marketingService.createVoucher(body); }

  @Post('validate')
  validate(@Body() body: { code: string; orderTotal: number }) {
    return this.marketingService.validateVoucher(body.code, body.orderTotal);
  }

  @Get(':code')
  findByCode(@Param('code') code: string) { return this.marketingService.findVoucherByCode(code); }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() body: any) { return this.marketingService.updateVoucher(id, body); }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  delete(@Param('id') id: string) { return this.marketingService.deleteVoucher(id); }
}
