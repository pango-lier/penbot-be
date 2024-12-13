import { Injectable } from '@nestjs/common';
import { CreateProxyDto } from './dto/create-proxy.dto';
import { UpdateProxyDto } from './dto/update-proxy.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Proxy } from './entities/proxy.entity';
import { Repository } from 'typeorm';
import { IPaginate } from '@paginate/interface/paginate.interface';
import { PaginateService } from '@paginate/paginate.service';

@Injectable()
export class ProxiesService {
  constructor(
    @InjectRepository(Proxy) private readonly repo: Repository<Proxy>,
    private readonly paginateService: PaginateService,
  ) {}
  create(createProxyDto: CreateProxyDto) {
    const proxy = this.repo.create(createProxyDto);
    return this.repo.save(proxy);
  }

  findAll(paginate: IPaginate, userId: number) {
    const query = this.repo.createQueryBuilder('proxy');
    query.leftJoinAndSelect('proxy.group', 'group');
    return this.paginateService.queryFilter<Proxy>(
      query,
      paginate,
      ['proxy.name'],
      {
        defaultTable: 'proxy',
        getQuery: 'getMany',
      },
    );
  }

  findOne(id: number) {
    return `This action returns a #${id} proxy`;
  }

  async update(id: number, updateProxyDto: UpdateProxyDto) {
    const update = await this.repo.findOne({
      where: { id, userId: updateProxyDto.userId },
    });
    update.active = updateProxyDto.active;
    update.proxyId = updateProxyDto.proxyId || null;
    update.proxyType = updateProxyDto.proxyType;
    update.name = updateProxyDto.name || null;
    update.host = updateProxyDto.host || null;
    update.port = updateProxyDto.port || null;
    update.country_code = updateProxyDto.country_code || null;
    update.username = updateProxyDto.username || null;
    update.password = updateProxyDto.password || null;
    update.groupId = updateProxyDto.groupId || null;
    return await this.repo.save(update);
  }

  remove(id: number, userId: number) {
    return this.repo.softDelete({ id, userId });
  }
}
