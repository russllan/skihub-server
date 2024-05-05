import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const exitUser = await this.userRepository.findOne({
      where: {
        phoneNumber: createUserDto.phoneNumber,
      },
    });
    if (exitUser)
      throw new BadRequestException('this phone number already exist!');

    const user = await this.userRepository.save({
      phoneNumber: createUserDto.phoneNumber,
      password: await argon2.hash(createUserDto.password),
    });

    const token = this.jwtService.sign({
      phoneNumber: createUserDto.phoneNumber,
    });

    return { user, token };
  }

  async findOne(phoneNumber: string) {
    return await this.userRepository.findOne({
      where: { phoneNumber: phoneNumber },
    });
  }

  async findOneUser(id: number) {
    const user = await this.userRepository.findOne({
      where: {id: id}
    });
    if(!user) throw new NotFoundException(`Такого пользователя нет с айди - ${id}!`);
    return user;
  }

  async findAll() {
    const user = await this.userRepository.find();
    if(!user) throw new NotFoundException('Пользователей нет');
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
