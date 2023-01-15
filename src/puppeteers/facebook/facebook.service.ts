import { Injectable } from '@nestjs/common';
import { CreateFacebookDto } from './dto/create-facebook.dto';
import { UpdateFacebookDto } from './dto/update-facebook.dto';
import { BrowserService } from '../browser/browser.service';
import Facebook from './service';

@Injectable()
export class FacebookService {
  constructor(private readonly browser: BrowserService) {}

  async login() {
    const { core } = await this.browser.StartUp();
    const facebook = new Facebook();
    await facebook.Login.goto(core);
    await facebook.Login.login(core, 'trong', 'sss');
    return 'This action adds a new facebook';
  }

  create(createFacebookDto: CreateFacebookDto) {
    return 'This action adds a new facebook';
  }

  findAll() {
    return `This action returns all facebook`;
  }

  findOne(id: number) {
    return `This action returns a #${id} facebook`;
  }

  update(id: number, updateFacebookDto: UpdateFacebookDto) {
    return `This action updates a #${id} facebook`;
  }

  remove(id: number) {
    return `This action removes a #${id} facebook`;
  }
}
