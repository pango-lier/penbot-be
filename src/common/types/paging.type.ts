export interface Paginated<Entity> {
  rows: Entity[];
  lastRow: number;
}

export enum PagingOrderEnum {
  asc = 'asc',
  desc = 'desc',
}
