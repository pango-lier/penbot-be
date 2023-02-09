import { Module } from '@nestjs/common';
import { SocialTargetsService } from './social-targets.service';
import { SocialTargetsController } from './social-targets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocialTarget } from './entities/social-target.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SocialTarget])],
  controllers: [SocialTargetsController],
  providers: [SocialTargetsService],
})
export class SocialTargetsModule {}
