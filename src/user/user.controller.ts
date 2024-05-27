import { Controller, Get, Post, Body, Patch, Delete, UsePipes, ValidationPipe, Req, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('user')
@ApiBearerAuth('JWT-auth')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("create")
  @ApiBody({type: CreateUserDto})
  @UsePipes(new ValidationPipe)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get("get")
  findAll() {
    return this.userService.findAll();
  }

  @Get("getOne")
  @UseGuards(JwtAuthGuard)
  findOne(@Req() req) {
    return this.userService.findOneUser(+req.user.id);
  }

  @Patch('update')
  @UseGuards(JwtAuthGuard)
  update(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+req.user.id, updateUserDto);
  }

  @Delete("delete")
  @UseGuards(JwtAuthGuard)
  remove(@Req() req) {
    return this.userService.remove(+req.user.id);
  }
}
