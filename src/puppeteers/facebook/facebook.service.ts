import { Injectable } from '@nestjs/common';
import {
  CreateFacebookDto,
  QueueDataFacebookDto,
} from './dto/create-facebook.dto';
import { UpdateFacebookDto } from './dto/update-facebook.dto';
import { BrowserService } from '../browser/browser.service';
import Facebook from './service';
import { CreateFacebookPostArticleDto } from './dto/create-facebook-post-article.dto';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class FacebookService {
  constructor(
    private readonly browser: BrowserService,
    @InjectQueue('write-log') private readonly writeLog: Queue,
    @InjectQueue('browser') private readonly browserQueue: Queue,
  ) {}

  async login() {
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

  async runMethodQueue(data: QueueDataFacebookDto) {
    await this[data.actionMethod](data);
  }
  async addQueue(data: QueueDataFacebookDto) {
    await this.browserQueue.add('facebook-service', data);
  }

  async createPostArticle(data: QueueDataFacebookDto) {
    const create = data.data;
    try {
      const { core } = await this.browser.StartUp();
      const facebook = new Facebook(core);
      await facebook.Login.login(create.username, create.password);
      await core.delay(2);
      await facebook.FanPage.goto(create.target);
      await facebook.FanPage.publishContent({
        content: create.content,
        imagePaths: create.imagePaths,
      });
    } catch (error) {
      this.writeLog.add('createPostArticle', {
        message_error: error.message,
        data: create,
      });
    }
    await this.browser.stop();
  }
}
