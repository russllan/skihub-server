import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";
import { Product } from "src/product/entities/product.entity";
import { User } from "src/user/entities/user.entity";

export class CreateBookedProductDto {
    isRefund: boolean

    @IsNotEmpty()
    @ApiProperty()
    endDate: string

    @IsNotEmpty()
    @ApiProperty()
    amount: number;

    @IsNotEmpty()
    @ApiProperty()
    product: Product

    @IsOptional()
    user: User

}
