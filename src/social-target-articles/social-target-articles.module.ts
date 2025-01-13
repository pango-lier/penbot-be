import { Module } from '@nestjs/common';
import { SocialTargetArticlesService } from './social-target-articles.service';
import { SocialTargetArticlesController } from './social-target-articles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocialTargetArticle } from './entities/social-target-article.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SocialTargetArticle])],
  controllers: [SocialTargetArticlesController],
  providers: [SocialTargetArticlesService],
  exports: [
    SocialTargetArticlesService,
    TypeOrmModule.forFeature([SocialTargetArticle]),
  ],
})
export class SocialTargetArticlesModule {}
