import { Test, TestingModule } from '@nestjs/testing';
import { PrintwayService } from './printway.service';

describe('PrintwayService', () => {
  let service: PrintwayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrintwayService],
    }).compile();

    service = module.get<PrintwayService>(PrintwayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
