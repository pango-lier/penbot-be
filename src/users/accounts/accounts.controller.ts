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
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { jwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from '../users.decorator';
import { ICurrentUser } from 'src/auth/interface/authenticated-user.interface';
import { Paginate } from 'src/paginate/decorator/paginate';
import { IPaginate } from 'src/paginate/interface/paginate.interface';
import { FormatResponseInterceptor } from 'src/common/interceptors/format-response/format-response.interceptor';

@Controller('accounts')
@UseGuards(jwtAuthGuard)
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  create(
    @Body() createAccountDto: CreateAccountDto,
    @CurrentUser() user: ICurrentUser,
  ) {
    createAccountDto.userId = +user.id;
    return this.accountsService.create(createAccountDto);
  }

  @Get()
  async findAll(
    @Paginate() paginate: IPaginate,
    @CurrentUser() user: ICurrentUser,
  ) {
    const [result, total] = await this.accountsService.findAll(
      paginate,
      +user.id,
    );
    return { result, total };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAccountDto: UpdateAccountDto,
    @CurrentUser() user: ICurrentUser,
  ) {
    updateAccountDto.userId = +user.id;
    return this.accountsService.update(+id, updateAccountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: ICurrentUser) {
    return this.accountsService.remove(+id, +user.id);
  }
}
