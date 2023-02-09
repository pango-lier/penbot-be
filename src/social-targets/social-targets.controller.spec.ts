import { Test, TestingModule } from '@nestjs/testing';
import { SocialTargetsController } from './social-targets.controller';
import { SocialTargetsService } from './social-targets.service';

describe('SocialTargetsController', () => {
  let controller: SocialTargetsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SocialTargetsController],
      providers: [SocialTargetsService],
    }).compile();

    controller = module.get<SocialTargetsController>(SocialTargetsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
