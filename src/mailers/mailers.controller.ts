import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MailersService } from './mailers.service';
import { CreateMailerDto } from './dto/create-mailer.dto';
import { UpdateMailerDto } from './dto/update-mailer.dto';

@Controller('mailers')
export class MailersController {
  constructor(private readonly mailersService: MailersService) {}

  @Post()
  create(@Body() createMailerDto: CreateMailerDto) {
    return this.mailersService.create(createMailerDto);
  }

  @Get()
  findAll() {
    return this.mailersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mailersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMailerDto: UpdateMailerDto) {
    return this.mailersService.update(+id, updateMailerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mailersService.remove(+id);
  }
}
