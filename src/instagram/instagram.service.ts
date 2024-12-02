import { Injectable } from '@nestjs/common';
import { CreateInstagramDto } from './dto/create-instagram.dto';
import { UpdateInstagramDto } from './dto/update-instagram.dto';

@Injectable()
export class InstagramService {
  create(createInstagramDto: CreateInstagramDto) {
    return 'This action adds a new instagram';
  }

  findAll() {
    return `This action returns all instagram`;
  }

  findOne(id: number) {
    return `This action returns a #${id} instagram`;
  }

  update(id: number, updateInstagramDto: UpdateInstagramDto) {
    return `This action updates a #${id} instagram`;
  }

  remove(id: number) {
    return `This action removes a #${id} instagram`;
  }
}
