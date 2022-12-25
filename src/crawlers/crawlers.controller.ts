import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CrawlersService } from './crawlers.service';
import { CreateCrawlerDto } from './dto/create-crawler.dto';
import { UpdateCrawlerDto } from './dto/update-crawler.dto';

@Controller('crawlers')
export class CrawlersController {
  constructor(private readonly crawlersService: CrawlersService) {}

  @Post()
  create(@Body() createCrawlerDto: CreateCrawlerDto) {
    return this.crawlersService.create(createCrawlerDto);
  }

  @Get()
  findAll() {
    return this.crawlersService.findAll();
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
