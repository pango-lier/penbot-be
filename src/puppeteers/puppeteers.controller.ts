import { Controller } from '@nestjs/common';
import { PuppeteersService } from './puppeteers.service';

@Controller('puppeteers')
export class PuppeteersController {
  constructor(private readonly puppeteersService: PuppeteersService) {}
}
