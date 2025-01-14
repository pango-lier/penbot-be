import { Test, TestingModule } from '@nestjs/testing';
import { XController } from './x.controller';
import { XService } from './x.service';

describe('XController', () => {
  let controller: XController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [XController],
      providers: [XService],
    }).compile();

    controller = module.get<XController>(XController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
