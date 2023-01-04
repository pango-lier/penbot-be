import { Module } from '@nestjs/common';
import { CrawlersService } from './crawlers.service';
import { CrawlersController } from './crawlers.controller';
import { CrawlerLinksModule } from './crawler-links/crawler-links.module';
import { YoutubeDlService } from './youtube-dl/youtube-dl.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Crawler } from './entities/crawler.entity';
import { CrawlerConfigsModule } from './crawler-configs/crawler-configs.module';
import { BullmqModule } from 'src/bullmq/bullmq.module';
import { CrawlerProcessor } from './queue/crawler.processor';

@Module({
  controllers: [CrawlersController],
  providers: [CrawlersService, YoutubeDlService, CrawlerProcessor],
  imports: [
    CrawlerLinksModule,
    TypeOrmModule.forFeature([Crawler]),
    CrawlerConfigsModule,
    BullmqModule,
  ],
})
export class CrawlersModule {}
