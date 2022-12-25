import { Test, TestingModule } from '@nestjs/testing';
import { CrawlersController } from './crawlers.controller';
import { CrawlersService } from './crawlers.service';

describe('CrawlersController', () => {
  let controller: CrawlersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CrawlersController],
      providers: [CrawlersService],
    }).compile();

    controller = module.get<CrawlersController>(CrawlersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
