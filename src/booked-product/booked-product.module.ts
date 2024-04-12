import { Module } from '@nestjs/common';
import { BookedProductService } from './booked-product.service';
import { BookedProductController } from './booked-product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookedProduct } from './entities/booked-product.entity';
import { ProductModule } from 'src/product/product.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([BookedProduct]), ProductModule, UserModule],
  controllers: [BookedProductController],
  providers: [BookedProductService],
})
export class BookedProductModule {}
