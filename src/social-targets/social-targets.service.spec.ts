import { Test, TestingModule } from '@nestjs/testing';
import { SocialTargetsService } from './social-targets.service';

describe('SocialTargetsService', () => {
  let service: SocialTargetsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SocialTargetsService],
    }).compile();

    service = module.get<SocialTargetsService>(SocialTargetsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
