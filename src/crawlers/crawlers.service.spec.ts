import { Test, TestingModule } from '@nestjs/testing';
import { CrawlersService } from './crawlers.service';

describe('CrawlersService', () => {
  let service: CrawlersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CrawlersService],
    }).compile();

    service = module.get<CrawlersService>(CrawlersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
