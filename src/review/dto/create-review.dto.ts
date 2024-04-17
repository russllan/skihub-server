import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
import { Base } from 'src/bases/entities/base.entity';
import { User } from 'src/user/entities/user.entity';

export class CreateReviewDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(0, { message: 'Рейтинг должен быть не менее 0' })
  @Max(5, { message: 'Рейтинг не может быть больше 5' })
  @ApiProperty()
  rating: number;

  @IsString()
  @ApiProperty()
  comment: string;

  @IsNotEmpty()
  @ApiProperty()
  base: Base;

  @IsOptional()
  user?: User;
}
