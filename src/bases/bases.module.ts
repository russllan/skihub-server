import { Module } from '@nestjs/common';
import { BasesService } from './bases.service';
import { BasesController } from './bases.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Base } from './entities/base.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Base])],
  controllers: [BasesController],
  providers: [BasesService],
})
export class BasesModule {}
