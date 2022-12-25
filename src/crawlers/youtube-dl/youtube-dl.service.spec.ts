import { Test, TestingModule } from '@nestjs/testing';
import { YoutubeDlService } from './youtube-dl.service';

describe('YoutubeDlService', () => {
  let service: YoutubeDlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [YoutubeDlService],
    }).compile();

    service = module.get<YoutubeDlService>(YoutubeDlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
