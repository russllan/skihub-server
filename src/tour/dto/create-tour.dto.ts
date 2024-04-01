import { IsNotEmpty, IsNumber, IsString, IsBoolean, IsDate } from 'class-validator';
import { Base } from 'src/bases/entities/base.entity';

export class CreateTourDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsNotEmpty()
  @IsNumber()
  cost: number;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsString()
  text?: string;

  @IsNumber()
  amountDay: number;

  @IsNotEmpty()
  @IsDate()
  startDate: Date;

  @IsNotEmpty()
  @IsDate()
  endDate: Date;

  @IsNotEmpty()
  @IsBoolean()
  isBooked: boolean;

  @IsNotEmpty()
  base: Base
}
