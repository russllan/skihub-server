import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { User } from "src/user/entities/user.entity";

export class CreateBaseDto {
    @ApiProperty()
    @IsNotEmpty()
    title: string

    @ApiProperty()
    @IsNotEmpty()
    image: string

    @ApiProperty()
    @IsNotEmpty()
    imageSlapes: string

    @ApiProperty()
    @IsNotEmpty()
    address: string

    @IsString()
    @ApiProperty()
    text: string

    @IsOptional()
    user?: User
}
