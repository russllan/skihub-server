import { IsNotEmpty, IsNumber, IsString, IsBoolean, IsDate, IsOptional } from 'class-validator';
import { Base } from 'src/bases/entities/base.entity';
import { User } from 'src/user/entities/user.entity';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  // @IsNotEmpty()
  // image: Buffer;

  @IsNotEmpty()
  image: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsNumber()
  cost: number;

  @IsNotEmpty()
  @IsString()
  type: string;

  size?: string;

  height?: number;

  weight?: number;

  color?: string;

  gender?: string;

  text?: string;

  @IsOptional()
  @IsDate()
  startDate: Date;

  @IsOptional()
  @IsDate()
  endDate: Date;

  status: string;

  isBooked: boolean;

  @IsOptional()
  user: User;

  @IsNotEmpty()
  base: Base;
}
