import { Module } from '@nestjs/common';
import { PuppeteersService } from './puppeteers.service';
import { PuppeteersController } from './puppeteers.controller';
import { FacebookModule } from './facebook/facebook.module';
import { CoreService } from './core/core.service';

@Module({
  controllers: [PuppeteersController],
  providers: [PuppeteersService, CoreService],
  imports: [FacebookModule]
})
export class PuppeteersModule {}
