import { Controller, Get } from '@nestjs/common';
import { MailersService } from './mailers.service';
import { CreateMailerDto } from './dto/create-mailer.dto';
import { UpdateMailerDto } from './dto/update-mailer.dto';
import { Mailer } from './entities/mailer.entity';
import { PagingQueryDto } from '@common/dto/paging-query.dto';
import { BaseController } from '@common/base/base.controller';

@Controller('mailers')
export class MailersController extends BaseController<
  Mailer,
  CreateMailerDto,
  UpdateMailerDto,
  PagingQueryDto
>(CreateMailerDto, UpdateMailerDto, PagingQueryDto) {
  constructor(protected service: MailersService) {
    super(service);
  }

  @Get('import')
  import() {
    return this.service.importData();
  }
}
