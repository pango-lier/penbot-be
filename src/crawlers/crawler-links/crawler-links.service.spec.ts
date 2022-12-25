import { Test, TestingModule } from '@nestjs/testing';
import { CrawlerLinksService } from './crawler-links.service';

describe('CrawlerLinksService', () => {
  let service: CrawlerLinksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CrawlerLinksService],
    }).compile();

    service = module.get<CrawlerLinksService>(CrawlerLinksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
