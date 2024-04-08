import { Injectable } from '@nestjs/common';
import { CreateMailerDto } from './dto/create-mailer.dto';
import { UpdateMailerDto } from './dto/update-mailer.dto';
import { BaseService } from '@common/base/base.service';
import { PagingQueryDto } from '@common/dto/paging-query.dto';
import { Mailer } from './entities/mailer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createReadStream } from 'fs';
import * as csvParser from 'csv-parser';
import { join } from 'path';

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

  async importData() {
    const results = [];
    const filePath = join(__dirname, '../mailers/data/csv1.csv');
    // Đọc dữ liệu từ tệp CSV và thêm vào mảng results
    createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        // Thêm dữ liệu vào cơ sở dữ liệu
        for (const result of results) {
          if (result?.Email?.toLowerCase()?.trim()) {
            const mailers = await this.repo.findOne({
              where: { email: result.Email.toLowerCase().trim() },
            });
            if (!mailers) {
              await this.create({ email: result.Email.toLowerCase().trim() });
            } else {
              await this.update(mailers.id, { ...mailers, ...result });
            }
          }
        }
      });
  }
}
