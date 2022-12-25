import { Module } from '@nestjs/common';
import { SocialsService } from './socials.service';
import { SocialsController } from './socials.controller';

@Module({
  controllers: [SocialsController],
  providers: [SocialsService]
})
export class SocialsModule {}
