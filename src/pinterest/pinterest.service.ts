import { Injectable } from '@nestjs/common';
import { CreatePinterestDto } from './dto/create-pinterest.dto';
import { UpdatePinterestDto } from './dto/update-pinterest.dto';

@Injectable()
export class PinterestService {
  create(createPinterestDto: CreatePinterestDto) {
    return 'This action adds a new pinterest';
  }

  findAll() {
    return `This action returns all pinterest`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pinterest`;
  }

  update(id: number, updatePinterestDto: UpdatePinterestDto) {
    return `This action updates a #${id} pinterest`;
  }

  remove(id: number) {
    return `This action removes a #${id} pinterest`;
  }
}
