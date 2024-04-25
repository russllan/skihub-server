import { PartialType } from '@nestjs/swagger';
import { CreateBookedTourDto } from './create-booked-tour.dto';

export class UpdateBookedTourDto extends PartialType(CreateBookedTourDto) {}
