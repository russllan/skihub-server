import { Module } from '@nestjs/common';
import { BookedProductService } from './booked-product.service';
import { BookedProductController } from './booked-product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookedProduct } from './entities/booked-product.entity';
import { ProductModule } from 'src/product/product.module';
import { UserModule } from 'src/user/user.module';
import { PaymentModule } from 'src/payment/payment.module';
import { Product } from 'src/product/entities/product.entity';
import { Payment } from 'src/payment/entities/payment.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([BookedProduct, Product, Payment]),
    ProductModule,
    UserModule,
    PaymentModule,
    ConfigModule.forRoot()
  ],
  controllers: [BookedProductController],
  providers: [BookedProductService, ConfigService],
})
export class BookedProductModule {}
