import { IdDto } from '@common/dto/id.dto';
import { PagingQueryDto } from '@common/dto/paging-query.dto';
import { paginate } from '@common/helpers/paging.helper';
import { ICrudService } from '@common/types/crud.type';
import { Paginated } from '@common/types/paging.type';
import { Injectable } from '@nestjs/common';
import { User } from '@users/entities/user.entity';
import {
  DeepPartial,
  DeleteResult,
  FindOptionsWhere,
  Repository,
} from 'typeorm';

@Injectable()
export class BaseService<
  EntityType,
  CreateDtoType,
  UpdateDtoType,
  QueryDtoType = void,
> implements
    ICrudService<EntityType, CreateDtoType, UpdateDtoType, QueryDtoType>
{
  constructor(protected repo: Repository<EntityType>) {}

  getRepo(): Repository<EntityType> {
    return this.repo;
  }

  create(dto: CreateDtoType, _user?: Partial<User>): Promise<EntityType> {
    const record = this.repo.create(dto as DeepPartial<EntityType>);
    return this.repo.save(record);
  }

  createMany(dtos: CreateDtoType[]): Promise<EntityType[]> {
    const records = this.repo.create(dtos as DeepPartial<EntityType>[]);
    return this.repo.save(records);
  }

  findAll(
    query?: PagingQueryDto & QueryDtoType,
  ): Promise<Paginated<EntityType>> {
    const queryBuilder = this.repo.createQueryBuilder(this.repo.metadata.name);
    if (query?.sortModel) {
      query.sortModel.forEach((item) => {
        queryBuilder.addOrderBy(
          `${this.repo.metadata.name}.${item.colId}`,
          (item.sort as any).toUpperCase(),
        );
      });
    } else if (
      this.repo.metadata.columns.some((item) => item.propertyName === 'order')
    ) {
      queryBuilder.orderBy(`${this.repo.metadata.name}.order`, 'ASC');
    } else {
      queryBuilder.orderBy(`${this.repo.metadata.name}.id`, 'DESC');
    }
    return paginate(query, queryBuilder);
  }

  findOne(id: number): Promise<EntityType> {
    return this.repo.findOneByOrFail({ id } as any);
  }

  async update(
    id: number,
    dto: UpdateDtoType,
    _user?: Partial<User>,
  ): Promise<EntityType> {
    const record = await this.repo.findOneByOrFail({ id } as any);
    this.repo.merge(record, dto as DeepPartial<EntityType>);
    return this.repo.save(record as any);
  }

  async updateMany(dtos: (IdDto & UpdateDtoType)[]): Promise<EntityType[]> {
    const records = this.repo.create(dtos as DeepPartial<EntityType>[]);
    const temp = await this.repo.upsert(records as any, ['id']);
    return this.repo.findBy(temp.identifiers as any);
  }

  async remove(id: number, _user?: Partial<User>): Promise<EntityType> {
    const record = await this.repo.findOneByOrFail({ id } as any);
    return this.repo.remove(record);
  }

  async delete(
    criteria: number | number[] | FindOptionsWhere<EntityType>,
  ): Promise<DeleteResult> {
    return this.repo.delete(criteria);
  }

  async createManyIgnoreId(
    dtos: DeepPartial<IdDto & CreateDtoType>[],
    conflicts: string[] = [],
  ): Promise<Awaited<EntityType>[]> {
    const records = dtos.map(async (item) => {
      if (item.id) return this.update(item.id, item as any);
      const temp = await this.repo.upsert(item as any, conflicts);
      return this.repo.findOneBy(temp.identifiers[0] as any);
    });
    return Promise.all(records);
  }
}
