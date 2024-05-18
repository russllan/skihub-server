import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Req, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('user')
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

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
