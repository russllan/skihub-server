import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBaseDto } from './dto/create-base.dto';
import { UpdateBaseDto } from './dto/update-base.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Base } from './entities/base.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BasesService {
  constructor(
    @InjectRepository(Base) private readonly baseRepository: Repository<Base>,
  ) {}

  async create(createBaseDto: CreateBaseDto, id: number) {
    const isExist = await this.baseRepository.findBy({
      user: { id },
      title: createBaseDto.title,
    });

    if (isExist.length)
      throw new BadRequestException('This base already exist!');

    const newBases = {
      title: createBaseDto.title,
      image: createBaseDto.image,
      imageSlapes: createBaseDto.image,
      address: createBaseDto.address,
      text: createBaseDto.text,
      user: { id },
    };

    if (!newBases) throw new BadRequestException('somithing went wrong...');
    return await this.baseRepository.save(newBases);
  }

  async findAll() {
    const bases = await this.baseRepository.find({
      relations: { reviews: true, productes: true, user: true },
    });
    if (!bases) throw new NotFoundException('Not found bases');
    return bases;
  }

  async findOne(id: number) {
    const bases = await this.baseRepository.findOne({
      where: { id: id },
      relations: {
        reviews: true,
        productes: true
      },
    });

    if (!bases) throw new NotFoundException(`Not found base ${id}`);
    return bases;
  }

  async update(id: number, updateBaseDto: UpdateBaseDto) {
    const bases = await this.baseRepository.findOne({
      where: { id: id },
    });

    if (!bases) throw new NotFoundException(`Not found base ${id}`);
    Object.assign(bases, updateBaseDto);
    return await this.baseRepository.save(bases);
  }

  async remove(id: number) {
    const bases = await this.baseRepository.findOne({
      where: { id: id },
    });

    if (!bases) throw new NotFoundException('Not found base');
    return await this.baseRepository.delete(id);
  }

  async findForAdmin(id: number) {
    const base = await this.baseRepository.find({
      where: { user: { id } },
    });
    if (!base) throw new NotFoundException('Горнолыжных баз нет!');
    return base;
  }
}
