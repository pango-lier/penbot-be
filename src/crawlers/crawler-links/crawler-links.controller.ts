import { jwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { ICurrentUser } from '@auth/interface/authenticated-user.interface';
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
import { Paginate } from '@paginate/decorator/paginate';
import { IPaginate } from '@paginate/interface/paginate.interface';
import { CurrentUser } from '@users/users.decorator';
import { CrawlerLinksService } from './crawler-links.service';
import { CreateCrawlerLinkDto } from './dto/create-crawler-link.dto';
import { UpdateCrawlerLinkDto } from './dto/update-crawler-link.dto';

@Controller('crawler-links')
@UseGuards(jwtAuthGuard)
export class CrawlerLinksController {
  constructor(private readonly crawlerLinksService: CrawlerLinksService) {}

  @Post()
  create(
    @Body() createCrawlerLinkDto: CreateCrawlerLinkDto,
    @CurrentUser() user: ICurrentUser,
  ) {
    return this.crawlerLinksService.create(createCrawlerLinkDto, +user.id);
  }

  @Get()
  async findAll(
    @Paginate() paginate: IPaginate,
    @CurrentUser() user: ICurrentUser,
  ) {
    const [result, total] = await this.crawlerLinksService.findAll(
      paginate,
      +user.id,
    );
    return {
      result,
      total,
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.crawlerLinksService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCrawlerLinkDto: UpdateCrawlerLinkDto,
  ) {
    return this.crawlerLinksService.update(+id, updateCrawlerLinkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: ICurrentUser) {
    return this.crawlerLinksService.remove(+id, +user.id);
  }
}
