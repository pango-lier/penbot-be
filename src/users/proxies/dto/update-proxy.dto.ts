import { PartialType } from '@nestjs/mapped-types';
import { CreateProxyDto } from './create-proxy.dto';

export class UpdateProxyDto extends PartialType(CreateProxyDto) {}
