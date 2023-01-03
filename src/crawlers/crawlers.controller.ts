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
import { CrawlersService } from './crawlers.service';
import { CreateCrawlerDto } from './dto/create-crawler.dto';
import { UpdateCrawlerDto } from './dto/update-crawler.dto';
import { Paginate } from 'src/paginate/decorator/paginate';
import { IPaginate } from 'src/paginate/interface/paginate.interface';
import { CurrentUser } from 'src/users/users.decorator';
import { ICurrentUser } from 'src/auth/interface/authenticated-user.interface';
import { use } from 'passport';
import { jwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('crawlers')
@UseGuards(jwtAuthGuard)
export class CrawlersController {
  constructor(private readonly crawlersService: CrawlersService) {}

  @Post()
  create(
    @Body() createCrawlerDto: CreateCrawlerDto,
    @CurrentUser() user: ICurrentUser,
  ) {
    return this.crawlersService.create(createCrawlerDto, +user.id);
  }

  @Get()
  async findAll(
    @Paginate() paginate: IPaginate,
    @CurrentUser() user: ICurrentUser,
  ) {
    const [result, total] = await this.crawlersService.findAll(
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
    return this.crawlersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCrawlerDto: UpdateCrawlerDto) {
    return this.crawlersService.update(+id, updateCrawlerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.crawlersService.remove(+id);
  }
}
