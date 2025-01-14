import { Injectable } from '@nestjs/common';
import { CreateXDto } from './dto/create-x.dto';
import { UpdateXDto } from './dto/update-x.dto';

@Injectable()
export class XService {
  create(createXDto: CreateXDto) {
    return 'This action adds a new x';
  }

  findAll() {
    return `This action returns all x`;
  }

  findOne(id: number) {
    return `This action returns a #${id} x`;
  }

  update(id: number, updateXDto: UpdateXDto) {
    return `This action updates a #${id} x`;
  }

  remove(id: number) {
    return `This action removes a #${id} x`;
  }
}
