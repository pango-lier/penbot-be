import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SocialsService } from './socials.service';
import { CreateSocialDto } from './dto/create-social.dto';
import { UpdateSocialDto } from './dto/update-social.dto';
import { jwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { Paginate } from '@paginate/decorator/paginate';
import { IPaginate } from '@paginate/interface/paginate.interface';
import { ICurrentUser } from '@auth/interface/authenticated-user.interface';
import { CurrentUser } from '@users/users.decorator';

@Controller('socials')
@UseGuards(jwtAuthGuard)
export class SocialsController {
  constructor(private readonly socialsService: SocialsService) { }

  @Post()
  create(@Body() createSocialDto: CreateSocialDto, @CurrentUser() user: ICurrentUser) {
    createSocialDto.userId = +user.id;
    return this.socialsService.create(createSocialDto);
  }

  @Get()
  async findPage(@Paginate() paginate: IPaginate,
    @CurrentUser() user: ICurrentUser) {
    const [result, total] = await this.socialsService.findPage(
      paginate,
      +user.id,
    );
    return { result, total };
  }

  @Get('all')
  findAll(@CurrentUser() user: ICurrentUser) {
    return this.socialsService.findAll(user.id);
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
