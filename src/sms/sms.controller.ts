import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SmsService } from './sms.service';
import { CreateSmDto } from './dto/create-sm.dto';
import { UpdateSmDto } from './dto/update-sm.dto';

@Controller('sms')
export class SmsController {
  constructor(private readonly smsService: SmsService) {}

  @Post('send')
  async sendSms(@Body('phoneNumber') phoneNumber: string, @Body('message') message: string) {
    return this.smsService.sendSms(phoneNumber, message);
  }

  // @Get('send')
  // async sendSms() {
  //   return this.smsService.sendSms();
  // }

}
