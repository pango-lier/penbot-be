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
import { CrawlerConfigsService } from './crawler-configs.service';
import { CreateCrawlerConfigDto } from './dto/create-crawler-config.dto';
import { UpdateCrawlerConfigDto } from './dto/update-crawler-config.dto';
import { jwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('crawler-configs')
@UseGuards(jwtAuthGuard)
export class CrawlerConfigsController {
  constructor(private readonly crawlerConfigsService: CrawlerConfigsService) {}

  @Post()
  create(@Body() createCrawlerConfigDto: CreateCrawlerConfigDto) {
    return this.crawlerConfigsService.create(createCrawlerConfigDto);
  }

  @Get()
  findAll() {
    return this.crawlerConfigsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.crawlerConfigsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCrawlerConfigDto: UpdateCrawlerConfigDto,
  ) {
    return this.crawlerConfigsService.update(+id, updateCrawlerConfigDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.crawlerConfigsService.remove(+id);
  }
}
