import { Injectable } from '@nestjs/common';
import { CreatePrintwayDto } from './dto/create-printway.dto';
import { UpdatePrintwayDto } from './dto/update-printway.dto';
import { BrowserService } from '@puppeteers/browser/browser.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Printway } from './entities/printway.entity';
import { Repository } from 'typeorm';
import { createLocalFile } from '@utils/file/fetchVideo';
import { CoreService } from '@puppeteers/core/core.service';

@Injectable()
export class PrintwayService {
  constructor(
    private readonly browser: BrowserService,
    @InjectRepository(Printway) private readonly printWay: Repository<Printway>,
  ) {}
  create(createPrintwayDto: CreatePrintwayDto) {
    return 'This action adds a new printway';
  }

  async findAll() {
    const dirProfile = createLocalFile(
      'printway_' + 'library',
      `/tmp/trong/profiles/printway`,
    );
    const { core } = await this.browser.StartUp({
      profile: 'printway',
      userDataDir: dirProfile,
    });
    await core.page.setRequestInterception(true);
    core.page.on('request', (request) => {
      if (request.resourceType() === 'image') {
        request.abort();
      } else {
        request.continue();
      }
    });
    const alphabet = [
      'a',
      'b',
      'c',
      'd',
      'e',
      'f',
      'g',
      'h',
      'i',
      'j',
      'k',
      'l',
      'm',
      'n',
      'o',
      'p',
      'q',
      'r',
      's',
      't',
      'u',
      'v',
      'w',
      'x',
      'y',
      'z',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '_',
    ];
    for (let i = 0; i < alphabet.length; i++) {
      await this.crawler(core, alphabet[i]);
    }
    try {
    } catch (error) {}

    await core.delay(5);
    return `This action returns all printway`;
  }

  async crawler(core: CoreService, search: any) {
    await core.goto('https://pro.printway.io/library');
    await core.delay(2);
    await core.click('input[placeholder="Search by name..."]');
    await core.delay(0.2);
    await core.input(search);
    console.log(search);
    await core.delay(1);
    await core.enter();
    await core.click('.MuiSvgIcon-root');
    await core.delay(1);
    console.log('scroll');
    await core.scrollRandDown(
      { stepMin: 500, stepMax: 1000 },
      { loopMin: 400, loopMax: 600 },
    );
    await core.delay(1);
    const images = await core.getAllSrcImageSelector(
      '.ant-table-tbody > .ant-table-row > .ant-table-cell > div > .ant-image > .ant-image-img',
    );
    const titles = await core.getContentSelectorAll(
      '.ant-table-tbody > .ant-table-row > .ant-table-cell:nth-child(3) > .name-row > span',
    );
    const type = await core.getContentSelectorAll(
      '.ant-table-tbody > .ant-table-row > .ant-table-cell:nth-child(4) > .detail-row > span:nth-child(1)',
    );
    const size = await core.getContentSelectorAll(
      '.ant-table-tbody > .ant-table-row > .ant-table-cell:nth-child(4) > .detail-row > span:nth-child(2)',
    );
    console.log(images, titles, type, size);
    if (images) {
      for (let index = 0; index < images.length; index++) {
        const url = images[index];
        const createPrintwayDto: CreatePrintwayDto = {
          url,
          title: titles[index] ?? '',
          data: {
            type: type[index] ?? '',
            size: size[index] ?? '',
          },
          search,
        };
        let _printw = await this.printWay.findOneBy({ url: '' });
        if (!_printw) {
          _printw = this.printWay.create(createPrintwayDto);
        }

        await this.printWay.save({ ..._printw, ...createPrintwayDto });
      }
    }
  }

  async findOne(id: number) {
    return `This action returns a #${id} printway`;
  }

  update(id: number, updatePrintwayDto: UpdatePrintwayDto) {
    return `This action updates a #${id} printway`;
  }

  remove(id: number) {
    return `This action removes a #${id} printway`;
  }
}
