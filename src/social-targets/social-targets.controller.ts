import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SocialTargetsService } from './social-targets.service';
import { CreateSocialTargetDto } from './dto/create-social-target.dto';
import { UpdateSocialTargetDto } from './dto/update-social-target.dto';

@Controller('social-targets')
export class SocialTargetsController {
  constructor(private readonly socialTargetsService: SocialTargetsService) {}

  @Post()
  create(@Body() createSocialTargetDto: CreateSocialTargetDto) {
    return this.socialTargetsService.create(createSocialTargetDto);
  }

  @Get()
  findAll() {
    return this.socialTargetsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.socialTargetsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSocialTargetDto: UpdateSocialTargetDto,
  ) {
    return this.socialTargetsService.update(+id, updateSocialTargetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.socialTargetsService.remove(+id);
  }
}
