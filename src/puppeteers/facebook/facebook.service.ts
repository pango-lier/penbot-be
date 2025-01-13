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
import { closePopup } from './service/lib/Fanpage/post/postContent';
import { Proxy } from '@users/proxies/entities/proxy.entity';

@Injectable()
export class FacebookService {
  intervalClosePopup;
  constructor(
    private readonly browser: BrowserService,
    @InjectQueue('write-log') private readonly writeLog: Queue,
  ) {}

  async init() {
    return 'This action adds a new facebook';
  }

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

  async createPostArticle(create: CreateFacebookPostArticleDto, proxy?: Proxy) {
    const dirProfile = createLocalFile('profile' + proxy.id, `/home/profiles`);
    const { core } = await this.browser.StartUp(
      {
        profile: proxy.name,
        userDataDir: dirProfile,
      },
      proxy,
    );
    const facebook = new Facebook(core);
    this.intervalClosePopup = setInterval(() => closePopup(core), 1000);
    await facebook.Login.login(create.username, create.password);
    await core.delay(2);
    await facebook.FanPage.goto(create.target);
    await facebook.FanPage.publishContent({
      content: create.content,
      imagePaths: create.imagePaths,
    });

    try {
      clearInterval(this.intervalClosePopup);
      await this.browser.stop();
    } catch (error) {}
    return true;
  }
}
