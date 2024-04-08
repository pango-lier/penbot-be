import { Module } from '@nestjs/common';
import { MailersService } from './mailers.service';
import { MailersController } from './mailers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mailer } from './entities/mailer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Mailer])],
  controllers: [MailersController],
  providers: [MailersService],
})
export class MailersModule {}
