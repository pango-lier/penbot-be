import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSocialDto } from './dto/create-social.dto';
import { UpdateSocialDto } from './dto/update-social.dto';
import { Social } from './entities/social.entity';

@Injectable()
export class SocialsService {

  constructor(
    @InjectRepository(Social) private readonly repo: Repository<Social>,
  ) { }

  create(createSocialDto: CreateSocialDto) {
    const user = this.repo.create(createSocialDto);
    return this.repo.save(user);
  }

  findAll() {
    return this.repo.find();
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
