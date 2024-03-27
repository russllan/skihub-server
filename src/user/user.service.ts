import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const exitUser = await this.userRepository.findOne({
      where: {
        phoneNumber: createUserDto.phoneNumber,
      },
    });
    if (exitUser) throw new BadRequestException('this phone number already exist!');

    const user = await this.userRepository.save({
      phoneNumber: createUserDto.phoneNumber,
      password: await argon2.hash(createUserDto.password),
    });

    return user;
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  async findOne(phoneNumber: string) {
    return await this.userRepository.findOne({
      where: { phoneNumber: phoneNumber },
    });
  }

  findAll() {
    return `This action returns all user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
