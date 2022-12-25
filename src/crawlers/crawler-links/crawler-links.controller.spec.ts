import { Test, TestingModule } from '@nestjs/testing';
import { CrawlerLinksController } from './crawler-links.controller';
import { CrawlerLinksService } from './crawler-links.service';

describe('CrawlerLinksController', () => {
  let controller: CrawlerLinksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CrawlerLinksController],
      providers: [CrawlerLinksService],
    }).compile();

    controller = module.get<CrawlerLinksController>(CrawlerLinksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
