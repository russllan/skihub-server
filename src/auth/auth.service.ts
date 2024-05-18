import { UserService } from './../user/user.service';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { IUser } from 'src/types/types';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(phoneNumber: string, password: string): Promise<any> {
    const user = await this.userService.findOne(phoneNumber);
    if(!user) throw new NotFoundException("Такой пользователь не зарегистрирован!");
    const passwordParse = await argon.verify(user.password, password);
    if (user && passwordParse) {
      return user;
    }
    throw new BadRequestException('Такого пользователя не существует');
  }

  async login(user: IUser) {
    const {id, phoneNumber} = user
    return {
      id, phoneNumber, token: this.jwtService.sign({ id: +user.id, phoneNumber: user.phoneNumber })
    }
  }
}
