import { Injectable } from '@nestjs/common';
import { CreateYoutubeDto } from './dto/create-youtube.dto';
import { UpdateYoutubeDto } from './dto/update-youtube.dto';
import { BrowserService } from '../browser/browser.service';
import { createLocalFile } from '../../utils/file/fetchVideo';
import Youtube from './service';
import { CoreService } from '../core/core.service';

@Injectable()
export class YoutubeService {
  constructor(private readonly browser: BrowserService) {}
  core: CoreService;
  youtube: Youtube;
  async init() {
    const dirProfile = createLocalFile(
      'youtube',
      `/tmp/trong/profiles/youtube`,
    );
    const { core } = await this.browser.StartUp({
      profile: 'youtube',
      userDataDir: dirProfile,
    });
    this.youtube = new Youtube(core);
  }
  create(createYoutubeDto: CreateYoutubeDto) {
    return 'This action adds a new youtube';
  }

  findAll() {
    return `This action returns all youtube`;
  }

  findOne(id: number) {
    return `This action returns a #${id} youtube`;
  }

  update(id: number, updateYoutubeDto: UpdateYoutubeDto) {
    return `This action updates a #${id} youtube`;
  }

  remove(id: number) {
    return `This action removes a #${id} youtube`;
  }
}
