import { Module } from '@nestjs/common';
import { CrawlerLinksService } from './crawler-links.service';
import { CrawlerLinksController } from './crawler-links.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CrawlerLink } from './entities/crawler-link.entity';
import { SocialTarget } from '../../social-targets/entities/social-target.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CrawlerLink, SocialTarget])],
  controllers: [CrawlerLinksController],
  providers: [CrawlerLinksService],
  exports: [TypeOrmModule.forFeature([CrawlerLink]), CrawlerLinksService],
})
export class CrawlerLinksModule {}
