import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { SocialTargetsService } from './social-targets.service';
import { CreateSocialTargetDto } from './dto/create-social-target.dto';
import { UpdateSocialTargetDto } from './dto/update-social-target.dto';
import { jwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { CurrentUser } from '@users/users.decorator';
import { ICurrentUser } from '@auth/interface/authenticated-user.interface';

@Controller('social-targets')
@UseGuards(jwtAuthGuard)
export class SocialTargetsController {
  constructor(private readonly socialTargetsService: SocialTargetsService) {}

  @Post()
  create(@Body() createSocialTargetDto: CreateSocialTargetDto) {
    return this.socialTargetsService.create(createSocialTargetDto);
  }

  @Get('find-all-raw')
  findAllRaw(@CurrentUser() user: ICurrentUser) {
    return this.socialTargetsService.findRaw(+user.id);
  }

  @Get()
  findSocialId(
    @Query('socialId') socialId: number,
    @CurrentUser() user: ICurrentUser,
  ) {
    return this.socialTargetsService.findSocialId(socialId, +user.id);
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
