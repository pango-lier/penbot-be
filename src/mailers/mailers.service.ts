import { Injectable } from '@nestjs/common';
import { CreateMailerDto } from './dto/create-mailer.dto';
import { UpdateMailerDto } from './dto/update-mailer.dto';
import { BaseService } from '@common/base/base.service';
import { PagingQueryDto } from '@common/dto/paging-query.dto';
import { Mailer } from './entities/mailer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MailersService extends BaseService<
  Mailer,
  CreateMailerDto,
  UpdateMailerDto,
  PagingQueryDto
> {
  constructor(@InjectRepository(Mailer) protected repo: Repository<Mailer>) {
    super(repo);
  }
}
