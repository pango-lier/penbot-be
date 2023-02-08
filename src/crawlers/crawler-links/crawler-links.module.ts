import { Module } from '@nestjs/common';
import { CrawlerLinksService } from './crawler-links.service';
import { CrawlerLinksController } from './crawler-links.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CrawlerLink } from './entities/crawler-link.entity';
import { Social } from '@socials/entities/social.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CrawlerLink,Social])],
  controllers: [CrawlerLinksController],
  providers: [CrawlerLinksService],
  exports: [TypeOrmModule.forFeature([CrawlerLink]), CrawlerLinksService],
})
export class CrawlerLinksModule {}
