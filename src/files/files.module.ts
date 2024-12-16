import { Module } from '@nestjs/common';
import { LinksService } from './files.service';
import { LinksController } from './files.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './entities/file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([File])],
  controllers: [LinksController],
  providers: [LinksService],
  exports: [LinksService, TypeOrmModule.forFeature([File])],
})
export class FilesModule {}
