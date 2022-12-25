import { Module } from '@nestjs/common';
import { PuppeteersService } from './puppeteers.service';
import { PuppeteersController } from './puppeteers.controller';

@Module({
  controllers: [PuppeteersController],
  providers: [PuppeteersService]
})
export class PuppeteersModule {}
