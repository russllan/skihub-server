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
import { Tour } from 'src/tour/entities/tour.entity';

@Injectable()
export class BookedTourService {
  constructor(
    @InjectRepository(BookedTour)
    private readonly bookedTourRepository: Repository<BookedTour>,
    @InjectRepository(Tour)
    private readonly tourRepository: Repository<Tour>,
  ) {}

  async create(createBookedTourDto: CreateBookedTourDto, id: number) {
    const isExist = await this.bookedTourRepository.findBy({
      user: { id: id },
      tour: createBookedTourDto.tour,
    });
    if (isExist.length)
      throw new BadRequestException('Этот Тур уже забронирован!');
    const tour = await this.tourRepository.findOne({
      where: { id: +createBookedTourDto.tour },
    });
    if (!tour) throw new NotFoundException('Такого тура нет!');
    if (tour.amount < createBookedTourDto.amount) {
      throw new BadRequestException(
        'Недостаточно доступных туров для бронирования!',
      );
    }
    tour.amount -= createBookedTourDto.amount;
    const newBookedTour = {
      isCancel: createBookedTourDto.isCancel,
      amount: createBookedTourDto.amount,
      user: { id },
      tour: createBookedTourDto.tour,
    };
    await this.bookedTourRepository.manager.transaction(
      async (transactionalEntityManager) => {
        await transactionalEntityManager.save(Tour, tour);
        await transactionalEntityManager.save(BookedTour, newBookedTour);
      },
    );
    return newBookedTour;
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
    Object.assign(bookedTour, updateBookedTourDto);
    return await this.bookedTourRepository.save(bookedTour);
  }

  async remove(id: number) {
    const bookedTour = await this.bookedTourRepository.findOne({
      where: { id: id },
    });
    if (!bookedTour) throw new NotFoundException('Забронированной тура нет!');
    return await this.bookedTourRepository.delete(id);
  }

  async findForAdmin(id: number) {
    const bookedTour = await this.bookedTourRepository.find({
      where: { user: { id } },
      relations: { tour: true },
    });
    if (!bookedTour) throw new NotFoundException('Такого забр. тура нет!');
    return bookedTour;
  }
}
