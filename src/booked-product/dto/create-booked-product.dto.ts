import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Payment } from "src/payment/entities/payment.entity";
import { Product } from "src/product/entities/product.entity";
import { User } from "src/user/entities/user.entity";

export class CreateBookedProductDto {
    // @IsNotEmpty()
    // @ApiProperty()
    // @IsNumber()
    // productes: number;

    // @IsOptional()
    // @ApiProperty()
    // @IsNumber()
    // price:number;

    // @IsNotEmpty()
    // @ApiProperty()
    // @IsString()
    // currency: string;

    @IsOptional()
    @IsBoolean()
    @ApiProperty()
    isRefund: boolean

    @IsNotEmpty()
    @ApiProperty()
    startDate: string

    @IsNotEmpty()
    @ApiProperty()
    endDate: string
    
    @IsNotEmpty()
    @ApiProperty()
    @IsNumber()
    amount:number;

    @IsNotEmpty()
    @ApiProperty()
    product: Product

}
