import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginateService } from '@paginate/paginate.service';
import { Repository } from 'typeorm';
import { CreateSocialDto } from './dto/create-social.dto';
import { UpdateSocialDto } from './dto/update-social.dto';
import { Social } from './entities/social.entity';

@Injectable()
export class SocialsService {

  constructor(
    @InjectRepository(Social) private readonly repo: Repository<Social>,
    private readonly paginateService: PaginateService,
  ) { }

  create(createSocialDto: CreateSocialDto) {
    const user = this.repo.create(createSocialDto);
    return this.repo.save(user);
  }

  findAll(userId) {
    return this.repo.find({
      where: { userId }
    });
  }

  findPage(paginate, userId) {
    const query = this.repo.createQueryBuilder('social').where('userId = :id', { id: userId });
    return this.paginateService.queryFilter<Social>(
      query,
      paginate,
      ['social.username'],
      {
        defaultTable: 'username',
        getQuery: 'getMany',
      },
    );
  }

  findOne(id: number) {
    return `This action returns a #${id} social`;
  }

  async update(id: number, updateSocialDto: UpdateSocialDto) {
    return await this.repo.update({ id }, updateSocialDto);
  }

  remove(id: number) {
    return `This action removes a #${id} social`;
  }
}
