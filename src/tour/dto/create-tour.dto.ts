import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsBoolean, IsDate } from 'class-validator';
import { Base } from 'src/bases/entities/base.entity';

export class CreateTourDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  location: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  image: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  cost: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  status: string;

  @IsString()
  @ApiProperty()
  text?: string;

  @IsNumber()
  @ApiProperty()
  amountDay: number;

  @IsNotEmpty()
  @IsDate()
  @ApiProperty()
  startDate: Date;

  @IsNotEmpty()
  @IsDate()
  @ApiProperty()
  endDate: Date;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty()
  isBooked: boolean;

  @IsNotEmpty()
  @ApiProperty()
  base: Base
}
