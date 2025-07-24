import { Test, TestingModule } from '@nestjs/testing';
import { EtsyController } from './etsy.controller';
import { EtsyService } from './etsy.service';

describe('EtsyController', () => {
  let controller: EtsyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EtsyController],
      providers: [EtsyService],
    }).compile();

    controller = module.get<EtsyController>(EtsyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
