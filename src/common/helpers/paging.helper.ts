import { PagingQueryDto } from '@common/dto/paging-query.dto';
import { Paginated } from '@common/types/paging.type';
import { SelectQueryBuilder } from 'typeorm';

export async function paginate<EntityType>(
  query: PagingQueryDto = null,
  queryBuilder: SelectQueryBuilder<EntityType>,
): Promise<Paginated<EntityType>> {
  if (query && query?.startRow && query?.endRow) {
    queryBuilder.skip(query.startRow).take(query.endRow - query.startRow);
  } else {
    queryBuilder.skip(0).take(10);
  }
  const result = await queryBuilder.getManyAndCount();
  return {
    rows: result[0],
    lastRow: result[1],
  };
}
