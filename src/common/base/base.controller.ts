import { PagingQueryDto } from '@common/dto/paging-query.dto';
import { AbstractValidationPipe } from '@common/pipes/abstract-validation.pipe';
import { PagingQueryPipe } from '@common/pipes/paging-query.pipe';
import { ICrudController, ICrudService } from '@common/types/crud.type';
import { Paginated } from '@common/types/paging.type';
import {
  Body,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Type,
  UsePipes,
} from '@nestjs/common';
import { ApiBody, ApiQuery } from '@nestjs/swagger';
import { User } from '@users/entities/user.entity';
import { CurrentUser } from '@users/users.decorator';

export function BaseController<
  EntityType,
  CreateDtoType,
  UpdateDtoType,
  QueryDtoType,
>(
  createDto: Type<CreateDtoType>,
  updateDto: Type<UpdateDtoType>,
  queryDto?: Type<QueryDtoType>,
): Type<
  ICrudController<EntityType, CreateDtoType, UpdateDtoType, QueryDtoType>
> {
  const createPipe = new AbstractValidationPipe(
    { whitelist: true, transform: true },
    { body: createDto },
  );
  const updatePipe = new AbstractValidationPipe(
    { whitelist: true, transform: true },
    { body: updateDto },
  );
  const queryPipe = new AbstractValidationPipe(
    { whitelist: true, transform: true },
    { query: queryDto },
  );

  class CrudController<EntityType, CreateDtoType, UpdateDtoType, QueryDtoType>
    implements
      ICrudController<EntityType, CreateDtoType, UpdateDtoType, QueryDtoType>
  {
    protected service: ICrudService<
      EntityType,
      CreateDtoType,
      UpdateDtoType,
      QueryDtoType
    >;

    @Post()
    @UsePipes(createPipe)
    @ApiBody({ type: createDto })
    create(
      @Body() body: CreateDtoType,
      @CurrentUser() user?: Partial<User>,
    ): Promise<EntityType> {
      return this.service.create(body, user);
    }

    @Get()
    @UsePipes(PagingQueryPipe, queryPipe)
    @ApiQuery({ type: queryDto })
    findAll(
      @Query(PagingQueryPipe) query?: PagingQueryDto & QueryDtoType,
    ): Promise<Paginated<EntityType>> {
      return this.service.findAll(query);
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number): Promise<EntityType> {
      return this.service.findOne(id);
    }

    @Patch(':id')
    @UsePipes(updatePipe)
    @ApiBody({ type: updateDto })
    update(
      @Param('id', ParseIntPipe) id: number,
      @Body() body: UpdateDtoType,
      @CurrentUser() user?: Partial<User>,
    ): Promise<EntityType> {
      return this.service.update(id, body, user);
    }

    @Delete(':id')
    remove(
      @Param('id', ParseIntPipe) id: number,
      @CurrentUser() user?: Partial<User>,
    ): Promise<Partial<EntityType>> {
      return this.service.remove(id, user);
    }
  }

  return CrudController;
}
