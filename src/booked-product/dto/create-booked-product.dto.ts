import { IsNotEmpty, IsOptional } from "class-validator";
import { Product } from "src/product/entities/product.entity";
import { User } from "src/user/entities/user.entity";

export class CreateBookedProductDto {
    isRefund: boolean

    @IsNotEmpty()
    endDate: string

    @IsNotEmpty()
    amount: number;

    @IsNotEmpty()
    product: Product

    @IsOptional()
    user: User

}
