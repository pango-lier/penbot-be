import { Injectable } from '@nestjs/common';
import { CreatePrintwayDto } from './dto/create-printway.dto';
import { UpdatePrintwayDto } from './dto/update-printway.dto';
import { BrowserService } from '@puppeteers/browser/browser.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Printway } from './entities/printway.entity';
import { IsNull, Repository } from 'typeorm';
import {
  createLocalFile,
  fetchImage,
  fetchVideo,
} from '@utils/file/fetchVideo';
import { CoreService } from '@puppeteers/core/core.service';
import axios from 'axios';
import Jimp from 'jimp';

@Injectable()
export class PrintwayService {
  constructor(
    private readonly browser: BrowserService,
    @InjectRepository(Printway) private readonly printWay: Repository<Printway>,
  ) {}
  create(createPrintwayDto: CreatePrintwayDto) {
    return 'This action adds a new printway';
  }

  async getOrder() {
    console.log('aa');
    for (let index = 0; index < 2000; index++) {
      try {
        const rest = await axios.request({
          url: 'https://pro.printway.io/api/list-new-order',
          method: 'post',
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxNTAyLCJ1c3JfZW1haWwiOiJraW5oZG9hbmgxMS5idEBnbWFpbC5jb20iLCJyb2xlX2lkIjo2LCJ1c3JfY29kZSI6IlBXU0VSMTUwMiIsInVzcl9maXJzdF9uYW1lIjoidHJvbmciLCJ1c3JfbGFzdF9uYW1lIjoidHJhbiIsInVzcl9hdmF0YXIiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQVRYQUp6YThKMGVYMDFsTnpEc0hzZHItM0dzb2NWNlJxVjV2Ym5VZm9EaT1zOTYtYyIsInVzZXJfbGV2ZWwiOiJ2aXAxIiwic3ViX2lkIjpudWxsLCJzdXBfY29kZSI6bnVsbCwiYWNjZXNzX3Rva2VuIjoiVTJGc2RHVmtYMTlJS2d4R0s2RE9IOXUvMmg1d3RrWUNGZVBnazcvdThnam9TcDhSNWVjTmpRTXRDUVJSUXdlcmswNCtwckdUOW1rcFgrK3VGaHhtU3lqMjEwcHBBWXJ0YjZPLzlUQWtYa2hIRGEwMmFZRUNwSTYvR3N2dnREVHlYdGhtZFI4VjdIR2Q3d25HWThOTVhxYmU0WWtsTmNWdEg5TDV5RHFIazlVPSIsImxpc3RfYWNjb3VudF9zdG9yZSI6IltcInNob3BpZnlcIixcImViYXlcIixcImFtYXpvblwiLFwiYXBpXCIsXCJ3b29jb21tZXJjZVwiLFwiZXRzeVwiXSIsImNoZWNrX3BhcmVudCI6ImZhbHNlIiwic2VsbGVyX2NoZWNrIjpudWxsfSwiaWF0IjoxNjkxMTkzMjg3LCJleHAiOjE2OTEyMjIwODd9.hR7NAlx7OEEN98pAGTYUWFEMhWg_7Qpho4wSo5TxVPg',
          },
          data: {
            user_id: index,
            role_id: 1,
            sup_code: null,
            start: '2023-05-01T00:00:00.000Z',
            end: '2023-08-05T23:59:59.000Z',
            track: 'all',
            keyWord: '',
            currentTab: '99+totalElements',
            design: 'all',
            shippingCountryCode: false,
            locationId: false,
            rows: 20,
            page: 0,
          },
        });
        console.log(`user ${index}`, rest.data);
      } catch (error) {
        console.log(error.message);
      }
    }
    return 's';
  }

  async findAll() {
    // return await this.getOrder();
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
      { stepMin: 500, stepMax: 800 },
      { loopMin: 500, loopMax: 750 },
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
        let _printw = await this.printWay.findOneBy({ url });
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

  async download() {
    const data = await this.printWay.find({
      where: { thumb512: IsNull() },
      select: { id: true, url: true },
    });
    console.log(data.length);
    for (let i = 0; i < data.length; i++) {
      try {
        const e = data[i];
        const filename = e.url.match(/.*\/(.*)$/)[1];
        const location = await fetchImage(e.url, filename);
        const image = await Jimp.read(location);
        console.log(image.bitmap.height, image.bitmap.width);
        e.width = image.bitmap.width;
        e.height = image.bitmap.height;
        e.location = location;
        const thumb256 = `/printway/thumb256/${filename}`;
        const thumb512 = `/printway/thumb512/${filename}`;
        await image.resize(256, Jimp.AUTO).quality(60).write(thumb256);
        await image.resize(512, Jimp.AUTO).quality(60).write(thumb512);
        e.thumb256 = thumb256;
        e.thumb512 = thumb512;
        await this.printWay.save(e);
      } catch (error) {
        console.log(error.message);
      }
    }
  }
}
