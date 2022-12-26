import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { Repository } from 'typeorm';
import { IPaginate } from 'src/paginate/interface/paginate.interface';
import { PaginateService } from 'src/paginate/paginate.service';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account) private readonly repo: Repository<Account>,
    private readonly paginateService: PaginateService,
  ) {}
  create(createAccountDto: CreateAccountDto) {
    const account = this.repo.create(createAccountDto);
    return this.repo.save(account);
  }

  findAll(paginate: IPaginate, userId: number) {
    const query = this.repo.createQueryBuilder('account');
    query.leftJoinAndSelect('account.group', 'group');
    return this.paginateService.queryFilter<Account>(
      query,
      paginate,
      ['account.name'],
      {
        defaultTable: 'account',
        getQuery: 'getMany',
      },
    );
  }

  findOne(id: number) {
    return `This action returns a #${id} account`;
  }

  update(id: number, updateAccountDto: UpdateAccountDto) {
    return this.repo.update(
      { id, userId: updateAccountDto.userId },
      updateAccountDto,
    );
  }

  remove(id: number, userId: number) {
    return this.repo.softDelete({ id, userId });
  }
}
