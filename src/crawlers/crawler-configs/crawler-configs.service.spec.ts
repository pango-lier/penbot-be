import { Test, TestingModule } from '@nestjs/testing';
import { CrawlerConfigsService } from './crawler-configs.service';

describe('CrawlerConfigsService', () => {
  let service: CrawlerConfigsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CrawlerConfigsService],
    }).compile();

    service = module.get<CrawlerConfigsService>(CrawlerConfigsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
