import { Module } from '@nestjs/common';
import { PuppeteersService } from './puppeteers.service';
import { PuppeteersController } from './puppeteers.controller';
import { FacebookModule } from './facebook/facebook.module';
import { CoreService } from './core/core.service';
import { BrowserModule } from './browser/browser.module';

@Module({
  controllers: [PuppeteersController],
  providers: [PuppeteersService, CoreService],
  imports: [FacebookModule, BrowserModule]
})
export class PuppeteersModule {}
