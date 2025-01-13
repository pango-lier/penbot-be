import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PublishSocialsService } from './publish-socials.service';
import { CreatePublishSocialDto } from './dto/create-publish-social.dto';
import { UpdatePublishSocialDto } from './dto/update-publish-social.dto';
import { jwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { CurrentUser } from '@users/users.decorator';
import { ICurrentUser } from '@auth/interface/authenticated-user.interface';

@Controller('publish-socials')
@UseGuards(jwtAuthGuard)
export class PublishSocialsController {
  constructor(private readonly publishSocialsService: PublishSocialsService) {}

  @Post()
  create(
    @Body() createPublishSocialDto: CreatePublishSocialDto,
    @CurrentUser() user: ICurrentUser,
  ) {
    return this.publishSocialsService.create(createPublishSocialDto, +user.id);
  }

  @Get()
  findAll() {
    return this.publishSocialsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.publishSocialsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePublishSocialDto: UpdatePublishSocialDto,
  ) {
    return this.publishSocialsService.update(+id, updatePublishSocialDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.publishSocialsService.remove(+id);
  }
}
