import { Test, TestingModule } from '@nestjs/testing';
import { PinterestController } from './pinterest.controller';
import { PinterestService } from './pinterest.service';

describe('PinterestController', () => {
  let controller: PinterestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PinterestController],
      providers: [PinterestService],
    }).compile();

    controller = module.get<PinterestController>(PinterestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
