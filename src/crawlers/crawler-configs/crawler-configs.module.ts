import { Module } from '@nestjs/common';
import { CrawlerConfigsService } from './crawler-configs.service';
import { CrawlerConfigsController } from './crawler-configs.controller';

@Module({
  controllers: [CrawlerConfigsController],
  providers: [CrawlerConfigsService]
})
export class CrawlerConfigsModule {}
