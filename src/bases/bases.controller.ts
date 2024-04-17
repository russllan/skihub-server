import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UsePipes, ValidationPipe, Req } from '@nestjs/common';
import { BasesService } from './bases.service';
import { CreateBaseDto } from './dto/create-base.dto';
import { UpdateBaseDto } from './dto/update-base.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('base')
@Controller('bases')
export class BasesController {
  constructor(private readonly basesService: BasesService) {}

  @Post('create')
  @ApiBody({type: CreateBaseDto})
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe)
  create(@Body() createBaseDto: CreateBaseDto, @Req() req) {
    return this.basesService.create(createBaseDto, +req.user.id);
  }

  @Get('getAll')
  findAll() {
    return this.basesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.basesService.findOne(+id);
  }

  @Patch(':id')
  @ApiBody({type: UpdateBaseDto})
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateBaseDto: UpdateBaseDto) {
    return this.basesService.update(+id, updateBaseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.basesService.remove(+id);
  }
}
