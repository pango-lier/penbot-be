import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { FilesModule } from '../files/files.module';
import { SocialTarget } from '../social-targets/entities/social-target.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Article, SocialTarget]), FilesModule],
  controllers: [ArticlesController],
  providers: [ArticlesService],
  exports: [ArticlesService, TypeOrmModule.forFeature([Article])],
})
export class ArticlesModule {}
