import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GoogleSearchConsoleService } from './google-search-console.service';
import { CreateGoogleSearchConsoleDto } from './dto/create-google-search-console.dto';
import { UpdateGoogleSearchConsoleDto } from './dto/update-google-search-console.dto';

@Controller('google-search-console')
export class GoogleSearchConsoleController {
  constructor(
    private readonly googleSearchConsoleService: GoogleSearchConsoleService,
  ) {}

  @Post()
  create(@Body() createGoogleSearchConsoleDto: CreateGoogleSearchConsoleDto) {
    return this.googleSearchConsoleService.create(createGoogleSearchConsoleDto);
  }

  @Get()
  findAll() {
    return this.googleSearchConsoleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.googleSearchConsoleService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGoogleSearchConsoleDto: UpdateGoogleSearchConsoleDto,
  ) {
    return this.googleSearchConsoleService.update(
      +id,
      updateGoogleSearchConsoleDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.googleSearchConsoleService.remove(+id);
  }
}
