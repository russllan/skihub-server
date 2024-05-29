import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UsePipes, ValidationPipe, Put } from '@nestjs/common';
import { BookedProductService } from './booked-product.service';
import { CreateBookedProductDto } from './dto/create-booked-product.dto';
import { UpdateBookedProductDto } from './dto/update-booked-product.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('booked-product')
@ApiBearerAuth('JWT-auth')
@Controller('booked-product')
export class BookedProductController {
  constructor(private readonly bookedProductService: BookedProductService) {}

  @Post('create')
  @ApiBody({type: CreateBookedProductDto})
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

  @Get('adminGet')
  @UseGuards(JwtAuthGuard)
  findForAdmin(@Req() req) {
    return this.bookedProductService.findForAdmin(+req.user.id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.bookedProductService.findOne(+id);
  }

  @Put(':id')
  @ApiBody({type: CreateBookedProductDto})
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
