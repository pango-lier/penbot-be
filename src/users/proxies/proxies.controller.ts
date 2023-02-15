import { jwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { ICurrentUser } from '@auth/interface/authenticated-user.interface';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Paginate } from '@paginate/decorator/paginate';
import { IPaginate } from '@paginate/interface/paginate.interface';
import { CurrentUser } from '@users/users.decorator';
import { ProxiesService } from './proxies.service';
import { CreateProxyDto } from './dto/create-proxy.dto';
import { UpdateProxyDto } from './dto/update-proxy.dto';
@Controller('proxies')
@UseGuards(jwtAuthGuard)
export class ProxiesController {
  constructor(private readonly proxiesService: ProxiesService) {}

  @Post()
  create(
    @Body() createProxyDto: CreateProxyDto,
    @CurrentUser() user: ICurrentUser,
  ) {
    createProxyDto.userId = +user.id;
    return this.proxiesService.create(createProxyDto);
  }

  @Get()
  async findAll(
    @Paginate() paginate: IPaginate,
    @CurrentUser() user: ICurrentUser,
  ) {
    const [result, total] = await this.proxiesService.findAll(
      paginate,
      +user.id,
    );
    return { result, total };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.proxiesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProxyDto: UpdateProxyDto,
    @CurrentUser() user: ICurrentUser,
  ) {
    updateProxyDto.userId = +user.id;
    return this.proxiesService.update(+id, updateProxyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: ICurrentUser) {
    return this.proxiesService.remove(+id, +user.id);
  }
}
