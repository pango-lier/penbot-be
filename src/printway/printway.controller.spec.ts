import { Test, TestingModule } from '@nestjs/testing';
import { PrintwayController } from './printway.controller';
import { PrintwayService } from './printway.service';

describe('PrintwayController', () => {
  let controller: PrintwayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrintwayController],
      providers: [PrintwayService],
    }).compile();

    controller = module.get<PrintwayController>(PrintwayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
