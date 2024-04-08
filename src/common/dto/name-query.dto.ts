import { PagingQueryDto } from '@common/dto/paging-query.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class NameQueryDto extends PagingQueryDto {
  @ApiProperty({ type: String, name: 'name', required: false })
  @IsOptional()
  @Type(() => String)
  @IsString({ each: true })
  name?: string;
}
