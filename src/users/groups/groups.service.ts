import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';
import { Repository } from 'typeorm';
import { IPaginate } from '@paginate/interface/paginate.interface';
import { PaginateService } from '@paginate/paginate.service';
@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group) private readonly group: Repository<Group>,
    private readonly paginateService: PaginateService,
  ) {}
  create(createGroupDto: CreateGroupDto) {
    return 'This action adds a new group';
  }

  async findAll(paginate: IPaginate, userId: number) {
    const q = this.group.createQueryBuilder();
    // q.select('group.*');
    return await this.paginateService.queryFilter<Group>(q, paginate, [], {
      defaultTable: 'group',
      getQuery: 'getMany',
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} group`;
  }

  update(id: number, updateGroupDto: UpdateGroupDto) {
    return `This action updates a #${id} group`;
  }

  remove(id: number) {
    return `This action removes a #${id} group`;
  }
}
