import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CrawlerLinksService } from './crawler-links.service';
import { CreateCrawlerLinkDto } from './dto/create-crawler-link.dto';
import { UpdateCrawlerLinkDto } from './dto/update-crawler-link.dto';

@Controller('crawler-links')
export class CrawlerLinksController {
  constructor(private readonly crawlerLinksService: CrawlerLinksService) {}

  @Post()
  create(@Body() createCrawlerLinkDto: CreateCrawlerLinkDto) {
    return this.crawlerLinksService.create(createCrawlerLinkDto);
  }

  @Get()
  findAll() {
    return this.crawlerLinksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.crawlerLinksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCrawlerLinkDto: UpdateCrawlerLinkDto) {
    return this.crawlerLinksService.update(+id, updateCrawlerLinkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.crawlerLinksService.remove(+id);
  }
}
