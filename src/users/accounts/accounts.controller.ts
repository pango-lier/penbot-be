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
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
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
