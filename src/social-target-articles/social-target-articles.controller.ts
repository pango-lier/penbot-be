import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SocialTargetArticlesService } from './social-target-articles.service';
import { CreateSocialTargetArticleDto } from './dto/create-social-target-article.dto';
import { UpdateSocialTargetArticleDto } from './dto/update-social-target-article.dto';

@Controller('social-target-articles')
export class SocialTargetArticlesController {
  constructor(
    private readonly socialTargetArticlesService: SocialTargetArticlesService,
  ) {}

  @Post()
  create(@Body() createSocialTargetArticleDto: CreateSocialTargetArticleDto) {
    return this.socialTargetArticlesService.create(
      createSocialTargetArticleDto,
    );
  }

  @Get()
  findAll() {
    return this.socialTargetArticlesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.socialTargetArticlesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSocialTargetArticleDto: UpdateSocialTargetArticleDto,
  ) {
    return this.socialTargetArticlesService.update(
      +id,
      updateSocialTargetArticleDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.socialTargetArticlesService.remove(+id);
  }
}
