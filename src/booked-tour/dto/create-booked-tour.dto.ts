import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
import { Tour } from "src/tour/entities/tour.entity";
import { User } from "src/user/entities/user.entity";

export class CreateBookedTourDto {
    @ApiProperty()
    @IsOptional()
    isCancel: boolean

    @ApiProperty()
    @IsOptional()
    amount: number

    @ApiProperty()
    @IsOptional()
    user?: User

    @ApiProperty()
    @IsOptional()
    tour?: Tour
}
