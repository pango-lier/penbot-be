import { Module } from '@nestjs/common';
import { CrawlerLinksService } from './crawler-links.service';
import { CrawlerLinksController } from './crawler-links.controller';

@Module({
  controllers: [CrawlerLinksController],
  providers: [CrawlerLinksService]
})
export class CrawlerLinksModule {}
