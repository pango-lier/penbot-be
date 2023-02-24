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
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Paginate } from '@paginate/decorator/paginate';
import { IPaginate } from '@paginate/interface/paginate.interface';
import { CurrentUser } from '@users/users.decorator';
import { ICurrentUser } from '@auth/interface/authenticated-user.interface';
import { jwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('articles')
@UseGuards(jwtAuthGuard)
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  create(
    @Body() createArticleDto: CreateArticleDto,
    @CurrentUser() user: ICurrentUser,
  ) {
    return this.articlesService.create(createArticleDto, +user.id);
  }

  @Get()
  async findAll(
    @Paginate() paginate: IPaginate,
    @CurrentUser() user: ICurrentUser,
  ) {
    const [result, total] = await this.articlesService.findAll(
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
    return this.articlesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articlesService.update(+id, updateArticleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articlesService.remove(+id);
  }
}
