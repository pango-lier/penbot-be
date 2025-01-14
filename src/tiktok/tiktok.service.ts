import { Injectable } from '@nestjs/common';
import { CreateTiktokDto } from './dto/create-tiktok.dto';
import { UpdateTiktokDto } from './dto/update-tiktok.dto';

@Injectable()
export class TiktokService {
  create(createTiktokDto: CreateTiktokDto) {
    return 'This action adds a new tiktok';
  }

  findAll() {
    return `This action returns all tiktok`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tiktok`;
  }

  update(id: number, updateTiktokDto: UpdateTiktokDto) {
    return `This action updates a #${id} tiktok`;
  }

  remove(id: number) {
    return `This action removes a #${id} tiktok`;
  }
}
