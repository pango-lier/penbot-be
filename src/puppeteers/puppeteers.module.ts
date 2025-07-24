import { Module } from '@nestjs/common';
import { PuppeteersService } from './puppeteers.service';
import { PuppeteersController } from './puppeteers.controller';
import { FacebookModule } from './facebook/facebook.module';
import { CoreService } from './core/core.service';
import { BrowserModule } from './browser/browser.module';
import { BrowserQueue } from './queue/browser.processor';
import { ArticlesModule } from '../articles/articles.module';
import { YoutubeModule } from './youtube/youtube.module';
import { YoutubeService } from './youtube/youtube.service';
import { SocialTargetsModule } from '@social-targets/social-targets.module';
import { SocialTargetArticlesModule } from '@social-target-articles/social-target-articles.module';
import { InstagramModule } from '@instagram/instagram.module';
import { EtsyModule } from '@etsy/etsy.module';

@Module({
  controllers: [PuppeteersController],
  providers: [PuppeteersService, CoreService, BrowserQueue],
  imports: [
    FacebookModule,
    BrowserModule,
    ArticlesModule,
    YoutubeModule,
    SocialTargetsModule,
    SocialTargetArticlesModule,
    EtsyModule,
    InstagramModule,
  ],
  exports: [PuppeteersModule, BrowserQueue, PuppeteersService, CoreService],
})
export class PuppeteersModule {}
