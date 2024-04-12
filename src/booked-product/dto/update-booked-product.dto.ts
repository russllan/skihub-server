import { PartialType } from '@nestjs/mapped-types';
import { CreateBookedProductDto } from './create-booked-product.dto';

export class UpdateBookedProductDto extends PartialType(CreateBookedProductDto) {}
