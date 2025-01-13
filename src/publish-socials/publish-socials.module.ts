import { Module } from '@nestjs/common';
import { PublishSocialsService } from './publish-socials.service';
import { PublishSocialsController } from './publish-socials.controller';
import { PuppeteersModule } from '@puppeteers/puppeteers.module';
import { ArticlesModule } from '@articles/articles.module';
import { SocialTargetArticlesModule } from '@social-target-articles/social-target-articles.module';

@Module({
  imports: [PuppeteersModule, ArticlesModule, SocialTargetArticlesModule],
  controllers: [PublishSocialsController],
  providers: [PublishSocialsService],
})
export class PublishSocialsModule {}
