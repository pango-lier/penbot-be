import { PagingOrderEnum } from '@common/types/paging.type';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class PagingSortDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  colId: string;

  @ApiProperty({ enum: PagingOrderEnum })
  @IsNotEmpty()
  @IsEnum(PagingOrderEnum)
  sort: PagingOrderEnum;
}

export class PagingQueryDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  startRow?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  endRow?: number;

  // @ApiProperty({ required: false, type: [PagingSortDto], name: 'sortModel[]' })
  // @ValidateNested({ each: true })
  @ApiProperty({
    required: false,
    type: 'array',
    name: 'sortModel[]',
    description: '{ "colId": "name", "sort": "asc" }',
    items: {
      type: 'string',
      required: ['colId', 'sort'],
      properties: {
        colId: {
          type: 'string',
        },
        sort: {
          type: 'string',
          enum: Object.values(PagingOrderEnum),
        },
      },
    },
  })
  @IsOptional()
  @Type(() => PagingSortDto)
  sortModel?: PagingSortDto[];
}
