import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PuppeteersService } from './puppeteers.service';
import { CreatePuppeteerDto } from './dto/create-puppeteer.dto';
import { UpdatePuppeteerDto } from './dto/update-puppeteer.dto';

@Controller('puppeteers')
export class PuppeteersController {
  constructor(private readonly puppeteersService: PuppeteersService) {}

  @Post()
  create(@Body() createPuppeteerDto: CreatePuppeteerDto) {
    return this.puppeteersService.create(createPuppeteerDto);
  }

  @Get()
  findAll() {
    return this.puppeteersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.puppeteersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePuppeteerDto: UpdatePuppeteerDto) {
    return this.puppeteersService.update(+id, updatePuppeteerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.puppeteersService.remove(+id);
  }
}
