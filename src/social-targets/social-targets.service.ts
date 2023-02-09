import { Injectable } from '@nestjs/common';
import { CreateSocialTargetDto } from './dto/create-social-target.dto';
import { UpdateSocialTargetDto } from './dto/update-social-target.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SocialTarget } from './entities/social-target.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SocialTargetsService {
  constructor(
    @InjectRepository(SocialTarget)
    private readonly socialTarget: Repository<SocialTarget>,
  ) {}
  async create(createSocialTargetDto: CreateSocialTargetDto) {
    const newSocialTarget = this.socialTarget.create(createSocialTargetDto);
    return await this.socialTarget.save(newSocialTarget);
  }

  async findAll(socialId: number, userId: number) {
    return await this.socialTarget.find({
      where: {
        social: { id: socialId },
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} socialTarget`;
  }

  async update(id: number, updateSocialTargetDto: UpdateSocialTargetDto) {
    const socialTarget = await this.socialTarget.findOneBy({ id });
    socialTarget.name = updateSocialTargetDto.name;
    socialTarget.link = updateSocialTargetDto.link;
    socialTarget.targetType = updateSocialTargetDto.targetType;
    return await this.socialTarget.save(socialTarget);
  }

  remove(id: number) {
    return `This action removes a #${id} socialTarget`;
  }
}
