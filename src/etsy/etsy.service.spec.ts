import { Test, TestingModule } from '@nestjs/testing';
import { EtsyService } from './etsy.service';

describe('EtsyService', () => {
  let service: EtsyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EtsyService],
    }).compile();

    service = module.get<EtsyService>(EtsyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
