import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { TourService } from './tour.service';
import { CreateTourDto } from './dto/create-tour.dto';
import { UpdateTourDto } from './dto/update-tour.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('tour')
@Controller('tour')
export class TourController {
  constructor(private readonly tourService: TourService) {}

  @Post('create')
  @ApiBody({type: CreateTourDto})
  // @UseGuards(JwtAuthGuard)
  create(@Body() createTourDto: CreateTourDto, @Req() req) {
    return this.tourService.create(createTourDto, +req.user.id);
  }

  @Get()
  // @UseGuards(JwtAuthGuard)
  findAll() {
    return this.tourService.findAll();
  }

  @Get(':id')
  // @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.tourService.findOne(+id);
  }

  @Patch(':id')
  @ApiBody({type: UpdateTourDto})
  // @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateTourDto: UpdateTourDto) {
    return this.tourService.update(+id, updateTourDto);
  }

  @Delete(':id')
  // @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.tourService.remove(+id);
  }
}
