import { Test, TestingModule } from '@nestjs/testing';
import { PinterestService } from './pinterest.service';

describe('PinterestService', () => {
  let service: PinterestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PinterestService],
    }).compile();

    service = module.get<PinterestService>(PinterestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
