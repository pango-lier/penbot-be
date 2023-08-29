import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PrintwayService } from './printway.service';
import { CreatePrintwayDto } from './dto/create-printway.dto';
import { UpdatePrintwayDto } from './dto/update-printway.dto';

@Controller('printway')
export class PrintwayController {
  constructor(private readonly printwayService: PrintwayService) {}

  @Post()
  create(@Body() createPrintwayDto: CreatePrintwayDto) {
    return this.printwayService.create(createPrintwayDto);
  }

  @Get()
  findAll() {
    return this.printwayService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.printwayService.download();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePrintwayDto: UpdatePrintwayDto) {
    return this.printwayService.update(+id, updatePrintwayDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.printwayService.remove(+id);
  }
}
