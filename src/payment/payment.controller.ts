import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth('JWT-auth')
@ApiTags('payment')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('create-payment-intent')
  async createPaymentIntent(@Body('price') price: number, @Body('currency') currency: string) {
    return this.paymentService.createPaymentIntent(price, currency);
  }

  @Get('all')
  async getAllPayments() {
    return this.paymentService.getAllPayments();
  }

  @Get('adminGet/:id')
  @UseGuards(JwtAuthGuard)
  async getAdmin(@Param('id') id: string) {
    return this.paymentService.getAdmin(+id);
  }

  @Get('getOne')
  @UseGuards(JwtAuthGuard)
  async getOnePayment(@Req() req) {
    return this.paymentService.getOnePayment(+req.user.id);
  }

 
}
