import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Req,
} from '@nestjs/common';
import { BasesService } from './bases.service';
import { CreateBaseDto } from './dto/create-base.dto';
import { UpdateBaseDto } from './dto/update-base.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('base')
@ApiBearerAuth('JWT-auth')
@Controller('bases')
export class BasesController {
  constructor(private readonly basesService: BasesService) {}

  @Post('create')
  @ApiBody({ type: CreateBaseDto })
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  create(@Body() createBaseDto: CreateBaseDto, @Req() req) {
    return this.basesService.create(createBaseDto, +req.user.id);
  }

  @Get('getAll')
  findAll() {
    return this.basesService.findAll();
  }
  
  @Get('adminGet')
  @UseGuards(JwtAuthGuard)
  findForAdmin(@Req() req) {
    return this.basesService.findForAdmin(+req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.basesService.findOne(+id);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateBaseDto })
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateBaseDto: UpdateBaseDto) {
    return this.basesService.update(+id, updateBaseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.basesService.remove(+id);
  }

}
