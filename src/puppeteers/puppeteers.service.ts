import { Injectable } from '@nestjs/common';
import { CreatePuppeteerDto } from './dto/create-puppeteer.dto';
import { UpdatePuppeteerDto } from './dto/update-puppeteer.dto';

@Injectable()
export class PuppeteersService {
  create(createPuppeteerDto: CreatePuppeteerDto) {
    return 'This action adds a new puppeteer';
  }

  findAll() {
    return `This action returns all puppeteers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} puppeteer`;
  }

  update(id: number, updatePuppeteerDto: UpdatePuppeteerDto) {
    return `This action updates a #${id} puppeteer`;
  }

  remove(id: number) {
    return `This action removes a #${id} puppeteer`;
  }
}
