import { Module } from '@nestjs/common';
import { XService } from './x.service';
import { XController } from './x.controller';

@Module({
  controllers: [XController],
  providers: [XService]
})
export class XModule {}
