import { Test, TestingModule } from '@nestjs/testing';
import { MailersController } from './mailers.controller';
import { MailersService } from './mailers.service';

describe('MailersController', () => {
  let controller: MailersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MailersController],
      providers: [MailersService],
    }).compile();

    controller = module.get<MailersController>(MailersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
