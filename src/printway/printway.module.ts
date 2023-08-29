import { Module } from '@nestjs/common';
import { PrintwayService } from './printway.service';
import { PrintwayController } from './printway.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Printway } from './entities/printway.entity';
import { ImageProcessor } from './queue/image.processor';

@Module({
  imports: [TypeOrmModule.forFeature([Printway])],
  controllers: [PrintwayController],
  providers: [PrintwayService, ImageProcessor],
})
export class PrintwayModule {}
