import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {}

  async create(createReviewDto: CreateReviewDto, id: number) {
    const isExist = await this.reviewRepository.findBy({
      user: {id},
      bases: createReviewDto.base,
      rating: createReviewDto.rating
    })

    if(isExist.length) throw new BadRequestException('This review already exist!')

    const newReview = {
      rating: createReviewDto.rating,
      comment: createReviewDto.comment,
      bases: createReviewDto.base,
      user: { id }
    }
    if(!newReview) throw new BadRequestException('somithing went wrong...')
    return await this.reviewRepository.save(newReview);
  }

  async findAll() {
    const review = await this.reviewRepository.find()
    if(!review) throw new NotFoundException('Not found reviews')

    return review;
  }

  async findOne(id: number) {
    const review = await this.reviewRepository.findOne({
      where: {id: id}
    })
    if(!review) throw new NotFoundException('Not found review')
    return review;
  }

  async update(id: number, updateReviewDto: UpdateReviewDto) {
    const review = await this.reviewRepository.findOne({
      where: {id: id}
    })
    if(!review) throw new NotFoundException('Not found review')
    return await this.reviewRepository.update(id, updateReviewDto);
  }

  async remove(id: number) {
    const review = await this.reviewRepository.findOne({
      where: {id: id}
    })
    if(!review) throw new NotFoundException('Not found review')
    return await this.reviewRepository.delete(id);
  }
}
