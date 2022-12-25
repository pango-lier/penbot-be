import { Test, TestingModule } from '@nestjs/testing';
import { SocialsController } from './socials.controller';
import { SocialsService } from './socials.service';

describe('SocialsController', () => {
  let controller: SocialsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SocialsController],
      providers: [SocialsService],
    }).compile();

    controller = module.get<SocialsController>(SocialsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
