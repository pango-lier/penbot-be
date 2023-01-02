import { Test, TestingModule } from '@nestjs/testing';
import { CrawlerConfigsController } from './crawler-configs.controller';
import { CrawlerConfigsService } from './crawler-configs.service';

describe('CrawlerConfigsController', () => {
  let controller: CrawlerConfigsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CrawlerConfigsController],
      providers: [CrawlerConfigsService],
    }).compile();

    controller = module.get<CrawlerConfigsController>(CrawlerConfigsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
