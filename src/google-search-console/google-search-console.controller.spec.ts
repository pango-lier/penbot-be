import { Test, TestingModule } from '@nestjs/testing';
import { GoogleSearchConsoleController } from './google-search-console.controller';
import { GoogleSearchConsoleService } from './google-search-console.service';

describe('GoogleSearchConsoleController', () => {
  let controller: GoogleSearchConsoleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GoogleSearchConsoleController],
      providers: [GoogleSearchConsoleService],
    }).compile();

    controller = module.get<GoogleSearchConsoleController>(GoogleSearchConsoleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
