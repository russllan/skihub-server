import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTourDto } from './dto/create-tour.dto';
import { UpdateTourDto } from './dto/update-tour.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tour } from './entities/tour.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TourService {
  constructor(
    @InjectRepository(Tour) private readonly tourRepository: Repository<Tour>
  ){}

  async create(createTourDto: CreateTourDto, id: number) {
    const isExist = await this.tourRepository.findBy({
     startDate: createTourDto.startDate, 
     endDate: createTourDto.endDate
    });

    if(isExist.length) throw new BadRequestException('This tour already exist!')

    const newTour = {
      title: createTourDto.title,
      location: createTourDto.location,
      cost: createTourDto.cost,
      status: createTourDto.status,
      text: createTourDto.text,
      amountDay: createTourDto.amountDay,
      startDate: createTourDto.startDate,
      endDate: createTourDto.endDate,
      base: createTourDto.base,
      user: { id }
    }
    if(!newTour) throw new BadRequestException('somithing went wrong...')
    return await this.tourRepository.save(newTour);
  }

  async findAll() {
    const tours = await this.tourRepository.find({
      relations: { user: true, base: true }
    })
    if(!tours) throw new NotFoundException('Not found tours')
    return tours;
  }

  async findOne(id: number) {
    const tour = await this.tourRepository.findOne({
      where: { id: id }
    })

    if(!tour) throw new NotFoundException('Not found this tour')
    return tour;
  }

  async update(id: number, updateTourDto: UpdateTourDto) {
    const tour = await this.tourRepository.findOne({
      where: {id: id}
    })

    if(!tour) throw new NotFoundException('Not found this tour')
    return await this.tourRepository.update(id, updateTourDto)
  }

  async remove(id: number) {
    const tour = await this.tourRepository.findOne({
      where: {id: id}
    })
    if(!tour) throw new NotFoundException('Not found this tour')
    return await this.tourRepository.delete(id)
  }
}
