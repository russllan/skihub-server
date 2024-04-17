import { ApiProperty } from "@nestjs/swagger";
import { MinLength } from "class-validator";

export class CreateUserDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    phoneNumber: string;

    @ApiProperty()
    @MinLength(4, {message: "Пароль короткий"})
    password: string;

    @ApiProperty()
    role: string;

    @ApiProperty()
    isBanned: boolean;
}
