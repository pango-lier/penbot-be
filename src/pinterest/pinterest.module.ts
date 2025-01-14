import { Module } from '@nestjs/common';
import { PinterestService } from './pinterest.service';
import { PinterestController } from './pinterest.controller';

@Module({
  controllers: [PinterestController],
  providers: [PinterestService],
  exports: [PinterestService],
})
export class PinterestModule {}
