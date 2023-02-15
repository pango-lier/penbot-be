import { Injectable } from '@nestjs/common';
import { CreateFacebookDto } from './dto/create-facebook.dto';
import { UpdateFacebookDto } from './dto/update-facebook.dto';
import { BrowserService } from '../browser/browser.service';
import Facebook from './service';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { createLocalFile } from '../../utils/file/fetchVideo';
import { SocialResponse } from '../type/response-puppeteer.interface';
import { CreateFacebookPostArticleDto } from './dto/create-facebook-post-article.dto';

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
    const result: SocialResponse = {
      status: 'success',
      message: null,
    };
    try {
      const dirProfile = createLocalFile(
        'facebook_' + create.username,
        `/tmp/trong/profiles/facebook`,
      );
      const { core } = await this.browser.StartUp({
        profile: create.username,
        userDataDir: dirProfile,
      });
      const facebook = new Facebook(core);
      await facebook.Login.login(create.username, create.password);
      await core.delay(2);
      await facebook.FanPage.goto(create.target);
      await facebook.FanPage.publishContent({
        content: create.content,
        imagePaths: create.imagePaths,
      });
    } catch (error) {
      result.status = 'error';
      result.message = error.message;
      console.log(error.message);
      this.writeLog.add('CreateFacebookPostArticleDto', result);
    }
    await this.browser.stop();
    return result;
  }
}
