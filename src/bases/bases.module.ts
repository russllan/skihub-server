import { Module } from '@nestjs/common';
import { BasesService } from './bases.service';
import { BasesController } from './bases.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Base } from './entities/base.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Base, User])],
  controllers: [BasesController],
  providers: [BasesService],
})
export class BasesModule {}
