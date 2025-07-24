import { Module } from '@nestjs/common';
import { EtsyService } from './etsy.service';
import { EtsyController } from './etsy.controller';

@Module({
  controllers: [EtsyController],
  providers: [EtsyService],
  exports: [EtsyModule, EtsyService],
})
export class EtsyModule {}
