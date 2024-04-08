import { PagingQueryDto } from '@common/dto/paging-query.dto';
import { Paginated } from './paging.type';
import { User } from '@users/entities/user.entity';

export interface ICrudService<
  EntityType,
  CreateDtoType,
  UpdateDtoType,
  QueryDtoType,
> {
  create(dto: CreateDtoType, user?: Partial<User>): Promise<EntityType>;
  findAll(
    query?: PagingQueryDto & QueryDtoType,
  ): Promise<Paginated<EntityType>>;
  findOne(id: number): Promise<EntityType>;
  update(
    id: number,
    dto: UpdateDtoType,
    user?: Partial<User>,
  ): Promise<EntityType>;
  remove(id: number, user?: Partial<User>): Promise<EntityType>;
}

export interface ICrudController<
  EntityType,
  CreateDtoType,
  UpdateDtoType,
  QueryDtoType,
> {
  create(body: CreateDtoType, user?: Partial<User>): Promise<EntityType>;
  findAll(
    query?: PagingQueryDto & QueryDtoType,
  ): Promise<Paginated<EntityType>>;
  findOne(id: number): Promise<EntityType>;
  update(
    id: number,
    body: UpdateDtoType,
    user?: Partial<User>,
  ): Promise<EntityType>;
  remove(id: number): Promise<Partial<EntityType>>;
}
