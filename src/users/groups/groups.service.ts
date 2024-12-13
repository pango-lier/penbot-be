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
    const createGroup = this.group.create(createGroupDto);
    return this.group.save(createGroup);
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

  async update(id: number, updateGroupDto: UpdateGroupDto) {
    const update = await this.group.findOne({
      where: { id },
    });
    const newUpdateGroup = this.group.merge(update, updateGroupDto);
    return await this.group.save(newUpdateGroup);
  }

  remove(id: number) {
    return this.group.delete(id);
  }
}
