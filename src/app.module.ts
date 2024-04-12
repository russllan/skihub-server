import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { TourModule } from './tour/tour.module';
import { BasesModule } from './bases/bases.module';
import { ReviewModule } from './review/review.module';
import { AuthModule } from './auth/auth.module';
import { BookedProductModule } from './booked-product/booked-product.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USERNAME'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        synchronize: true,
        entities: [__dirname + '/**/*.entity{.js, .ts}'],
      }),
      inject: [ConfigService],
    }),
    UserModule,
    ProductModule,
    TourModule,
    BasesModule,
    ReviewModule,
    AuthModule,
    BookedProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
