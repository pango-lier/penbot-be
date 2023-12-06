import { Module } from '@nestjs/common';
import { GoogleSearchConsoleService } from './google-search-console.service';
import { GoogleSearchConsoleController } from './google-search-console.controller';

@Module({
  controllers: [GoogleSearchConsoleController],
  providers: [GoogleSearchConsoleService],
})
export class GoogleSearchConsoleModule {}
