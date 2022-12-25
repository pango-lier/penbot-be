import { Module } from '@nestjs/common';
import { CrawlersService } from './crawlers.service';
import { CrawlersController } from './crawlers.controller';
import { CrawlerLinksModule } from './crawler-links/crawler-links.module';
import { YoutubeDlService } from './youtube-dl/youtube-dl.service';

@Module({
  controllers: [CrawlersController],
  providers: [CrawlersService, YoutubeDlService],
  imports: [CrawlerLinksModule]
})
export class CrawlersModule {}
