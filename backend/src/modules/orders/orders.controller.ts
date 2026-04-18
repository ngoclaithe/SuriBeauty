import { Controller, Get, Post, Patch, Body, Param, Query, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { OrderStatus } from '@prisma/client';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post()
  create(@Body() body: any) { return this.ordersService.create(body); }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Query('page') page?: string, @Query('limit') limit?: string, @Query('status') status?: OrderStatus) {
    return this.ordersService.findAll(Number(page) || 1, Number(limit) || 20, status);
  }

  @Get(':id')
  findById(@Param('id') id: string) { return this.ordersService.findById(id); }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard)
  updateStatus(@Param('id') id: string, @Body('status') status: OrderStatus) {
    return this.ordersService.updateStatus(id, status);
  }
}
