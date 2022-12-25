import { Test, TestingModule } from '@nestjs/testing';
import { PuppeteersController } from './puppeteers.controller';
import { PuppeteersService } from './puppeteers.service';

describe('PuppeteersController', () => {
  let controller: PuppeteersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PuppeteersController],
      providers: [PuppeteersService],
    }).compile();

    controller = module.get<PuppeteersController>(PuppeteersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
