import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SocialsService } from './socials.service';
import { CreateSocialDto } from './dto/create-social.dto';
import { UpdateSocialDto } from './dto/update-social.dto';

@Controller('socials')
export class SocialsController {
  constructor(private readonly socialsService: SocialsService) {}

  @Post()
  create(@Body() createSocialDto: CreateSocialDto) {
    return this.socialsService.create(createSocialDto);
  }

  @Get()
  findAll() {
    return this.socialsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.socialsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSocialDto: UpdateSocialDto) {
    return this.socialsService.update(+id, updateSocialDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.socialsService.remove(+id);
  }
}
