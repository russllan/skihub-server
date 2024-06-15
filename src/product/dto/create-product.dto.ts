import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsBoolean, IsDate, IsOptional } from 'class-validator';
import { Base } from 'src/bases/entities/base.entity';
import { User } from 'src/user/entities/user.entity';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  title: string;

  // @IsNotEmpty()
  // image: Buffer;

  @IsNotEmpty()
  @ApiProperty()
  image: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  amount: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  cost: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  type: string;

  @ApiProperty()
  size?: string;

  @ApiProperty()
  height?: number;

  @ApiProperty()
  weight?: number;

  @ApiProperty()
  color?: string;

  @ApiProperty()
  gender?: string;

  @ApiProperty()
  text?: string;

  // @IsOptional()
  // @IsDate()
  // @ApiProperty()
  // startDate: Date;

  // @IsOptional()
  // @IsDate()
  // @ApiProperty()
  // endDate: Date;

  @ApiProperty()
  status: string;

  @ApiProperty()
  isBooked: boolean;

  @IsOptional()
  user: User;

  @IsNotEmpty()
  @ApiProperty()
  base: Base;
}
