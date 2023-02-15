import { Module } from '@nestjs/common';
import { PuppeteersService } from './puppeteers.service';
import { PuppeteersController } from './puppeteers.controller';
import { FacebookModule } from './facebook/facebook.module';
import { CoreService } from './core/core.service';
import { BrowserModule } from './browser/browser.module';
import { BrowserQueue } from './queue/browser.processor';
import { ArticlesModule } from '../articles/articles.module';

@Module({
  controllers: [PuppeteersController],
  providers: [PuppeteersService, CoreService, BrowserQueue],
  imports: [FacebookModule, BrowserModule, ArticlesModule],
  exports: [PuppeteersModule, BrowserQueue, PuppeteersService, CoreService],
})
export class PuppeteersModule {}
