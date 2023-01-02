import { Module } from '@nestjs/common';
import { CrawlerLinksService } from './crawler-links.service';
import { CrawlerLinksController } from './crawler-links.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CrawlerLink } from './entities/crawler-link.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CrawlerLink])],
  controllers: [CrawlerLinksController],
  providers: [CrawlerLinksService],
  exports: [TypeOrmModule.forFeature([CrawlerLink]), CrawlerLinksModule],
})
export class CrawlerLinksModule {}
