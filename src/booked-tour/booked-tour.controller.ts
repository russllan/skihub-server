import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ValidationPipe, UsePipes, Req, Put } from '@nestjs/common';
import { BookedTourService } from './booked-tour.service';
import { CreateBookedTourDto } from './dto/create-booked-tour.dto';
import { UpdateBookedTourDto } from './dto/update-booked-tour.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('booked-tour')
@ApiBearerAuth('JWT-auth')
@Controller('booked-tour')
export class BookedTourController {
  constructor(private readonly bookedTourService: BookedTourService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe)
  create(@Body() createBookedTourDto: CreateBookedTourDto, @Req() req) {
    return this.bookedTourService.create(createBookedTourDto, +req.user.id);
  }

  @Get()
  findAll() {
    return this.bookedTourService.findAll();
  }

  @Get('adminGet')
  @UseGuards(JwtAuthGuard)
  findForAdmin(@Req() req) {
    return this.bookedTourService.findForAdmin(+req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookedTourService.findOne(+id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateBookedTourDto: UpdateBookedTourDto) {
    return this.bookedTourService.update(+id, updateBookedTourDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookedTourService.remove(+id);
  }
}
