import { Module } from '@nestjs/common';
import { SocialTargetsService } from './social-targets.service';
import { SocialTargetsController } from './social-targets.controller';

@Module({
  controllers: [SocialTargetsController],
  providers: [SocialTargetsService]
})
export class SocialTargetsModule {}
