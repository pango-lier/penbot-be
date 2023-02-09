import { Module } from '@nestjs/common';
import { CrawlersService } from './crawlers.service';
import { CrawlersController } from './crawlers.controller';
import { CrawlerLinksModule } from './crawler-links/crawler-links.module';
import { YoutubeDlService } from './youtube-dl/youtube-dl.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Crawler } from './entities/crawler.entity';
import { CrawlerConfigsModule } from './crawler-configs/crawler-configs.module';
import { CrawlerProcessor } from './queue/crawler.processor';
import { BullmqModule } from '@bullmq/bullmq.module';
import { PuppeteersModule } from '@puppeteers/puppeteers.module';
import { Social } from '@socials/entities/social.entity';

@Module({
  controllers: [CrawlersController],
  providers: [CrawlersService, YoutubeDlService, CrawlerProcessor],
  imports: [
    CrawlerLinksModule,
    TypeOrmModule.forFeature([Crawler, Social]),
    CrawlerConfigsModule,
    BullmqModule,
    PuppeteersModule,
  ],
})
export class CrawlersModule {}
