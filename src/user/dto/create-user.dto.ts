import { MinLength } from "class-validator";

export class CreateUserDto {
    id: string;

    phoneNumber: string;

    @MinLength(4, {message: "Пароль короткий"})
    password: string;

    role: string;

    isBanned: boolean;
}
