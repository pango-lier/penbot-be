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
import { jwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RunCrawlerQueueDto } from './dto/run-crawler-queue.dto';
import { CurrentUser } from '@users/users.decorator';
import { ICurrentUser } from '@auth/interface/authenticated-user.interface';
import { IPaginate } from '@paginate/interface/paginate.interface';
import { Paginate } from '@paginate/decorator/paginate';

@Controller('crawlers')
@UseGuards(jwtAuthGuard)
export class CrawlersController {
  constructor(private readonly crawlersService: CrawlersService) {}

  @Post('run-queues')
  runQueueCrawler(
    @Body() options: RunCrawlerQueueDto,
    @CurrentUser() user: ICurrentUser,
  ) {
    console.log(options);
    return this.crawlersService.runQueueCrawler(options, +user.id);
  }

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
