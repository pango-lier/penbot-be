import { Test, TestingModule } from '@nestjs/testing';
import { PuppeteersService } from './puppeteers.service';

describe('PuppeteersService', () => {
  let service: PuppeteersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PuppeteersService],
    }).compile();

    service = module.get<PuppeteersService>(PuppeteersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
