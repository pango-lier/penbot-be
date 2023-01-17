import { Injectable } from '@nestjs/common';
import { CreateFacebookDto } from './dto/create-facebook.dto';
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

  async createPostArticle(create: CreateFacebookPostArticleDto) {
    try {
      const { core } = await this.browser.StartUp();
      const facebook = new Facebook(core);
      await facebook.Login.login(create.username, create.password);
      console.log('facebook.Login.login');
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
