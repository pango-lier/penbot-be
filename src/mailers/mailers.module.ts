import { Module } from '@nestjs/common';
import { MailersService } from './mailers.service';
import { MailersController } from './mailers.controller';

@Module({
  controllers: [MailersController],
  providers: [MailersService]
})
export class MailersModule {}
