import { Test, TestingModule } from '@nestjs/testing';
import { SocialTargetArticlesController } from './social-target-articles.controller';
import { SocialTargetArticlesService } from './social-target-articles.service';

describe('SocialTargetArticlesController', () => {
  let controller: SocialTargetArticlesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SocialTargetArticlesController],
      providers: [SocialTargetArticlesService],
    }).compile();

    controller = module.get<SocialTargetArticlesController>(SocialTargetArticlesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
