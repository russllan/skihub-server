import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { User } from "src/user/entities/user.entity";

export class CreateBaseDto {
    @IsNotEmpty()
    title: string

    @IsNotEmpty()
    image: string

    @IsNotEmpty()
    imageSlapes: string

    @IsNotEmpty()
    address: string

    @IsString()
    text: string

    @IsOptional()
    user?: User
}
