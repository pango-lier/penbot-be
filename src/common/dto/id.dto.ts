import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export class IdDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  id: number;
}
