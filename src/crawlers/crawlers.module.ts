import { Module } from '@nestjs/common';
import { CrawlersService } from './crawlers.service';
import { CrawlersController } from './crawlers.controller';
import { CrawlerLinksModule } from './crawler-links/crawler-links.module';
import { YoutubeDlService } from './youtube-dl/youtube-dl.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Crawler } from './entities/crawler.entity';
import { CrawlerConfigsModule } from './crawler-configs/crawler-configs.module';

@Module({
  controllers: [CrawlersController],
  providers: [CrawlersService, YoutubeDlService],
  imports: [
    CrawlerLinksModule,
    TypeOrmModule.forFeature([Crawler]),
    CrawlerConfigsModule,
  ],
})
export class CrawlersModule {}
