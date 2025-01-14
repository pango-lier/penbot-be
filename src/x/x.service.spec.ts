import { Test, TestingModule } from '@nestjs/testing';
import { XService } from './x.service';

describe('XService', () => {
  let service: XService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [XService],
    }).compile();

    service = module.get<XService>(XService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
