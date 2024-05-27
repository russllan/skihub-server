import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBookedTourDto } from './dto/create-booked-tour.dto';
import { UpdateBookedTourDto } from './dto/update-booked-tour.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BookedTour } from './entities/booked-tour.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BookedTourService {
  constructor(
    @InjectRepository(BookedTour)
    private readonly bookedTourRepository: Repository<BookedTour>,
  ) {}

  async create(createBookedTourDto: CreateBookedTourDto, id: number) {
    const isExist = await this.bookedTourRepository.findBy({
      user: createBookedTourDto.user,
      tour: createBookedTourDto.tour,
    });
    if (isExist.length)
      throw new BadRequestException('Этот Тур уже забронирован!');
    const newBookedTour = {
      isCancel: createBookedTourDto.isCancel,
      user: { id },
      tour: createBookedTourDto.tour,
    };
    return await this.bookedTourRepository.save(newBookedTour);
  }

  async findAll() {
    const bookedTour = await this.bookedTourRepository.find({
      relations: { user: true, tour: true },
    });
    if (!bookedTour) throw new NotFoundException('Забронированных туров нету!');
    return bookedTour;
  }

  async findOne(id: number) {
    const bookedTour = await this.bookedTourRepository.findOne({
      where: { id: id },
    });
    if (!bookedTour) throw new NotFoundException('Забронированной тура нет!');
    return bookedTour;
  }

  async update(id: number, updateBookedTourDto: UpdateBookedTourDto) {
    const bookedTour = await this.bookedTourRepository.findOne({
      where: { id: id },
    });
    if (!bookedTour) throw new NotFoundException('Забронированной тура нет!');
    return await this.bookedTourRepository.update(id, updateBookedTourDto);
  }

  async remove(id: number) {
    const bookedTour = await this.bookedTourRepository.findOne({
      where: { id: id },
    });
    if (!bookedTour) throw new NotFoundException('Забронированной тура нет!');
    return await this.bookedTourRepository.delete(id);
  }

  async findForAdmin(id: number) {
    const bookedTour = await this.bookedTourRepository.findOne({
      where: { user: { id } },
    });
    if (!bookedTour) throw new NotFoundException('Такого забр. тура нет!');
    return bookedTour;
  }
}
