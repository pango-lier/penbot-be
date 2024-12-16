import { Test, TestingModule } from '@nestjs/testing';
import { SocialTargetArticlesService } from './social-target-articles.service';

describe('SocialTargetArticlesService', () => {
  let service: SocialTargetArticlesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SocialTargetArticlesService],
    }).compile();

    service = module.get<SocialTargetArticlesService>(SocialTargetArticlesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
