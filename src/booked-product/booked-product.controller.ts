import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { BookedProductService } from './booked-product.service';
import { CreateBookedProductDto } from './dto/create-booked-product.dto';
import { UpdateBookedProductDto } from './dto/update-booked-product.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('booked-product')
export class BookedProductController {
  constructor(private readonly bookedProductService: BookedProductService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe)
  create(@Body() createBookedProductDto: CreateBookedProductDto, @Req() req) {
    return this.bookedProductService.create(createBookedProductDto, +req.user.id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.bookedProductService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.bookedProductService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateBookedProductDto: UpdateBookedProductDto) {
    return this.bookedProductService.update(+id, updateBookedProductDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.bookedProductService.remove(+id);
  }
}
