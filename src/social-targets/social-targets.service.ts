import { Injectable } from '@nestjs/common';
import { CreateSocialTargetDto } from './dto/create-social-target.dto';
import { UpdateSocialTargetDto } from './dto/update-social-target.dto';

@Injectable()
export class SocialTargetsService {
  create(createSocialTargetDto: CreateSocialTargetDto) {
    return 'This action adds a new socialTarget';
  }

  findAll() {
    return `This action returns all socialTargets`;
  }

  findOne(id: number) {
    return `This action returns a #${id} socialTarget`;
  }

  update(id: number, updateSocialTargetDto: UpdateSocialTargetDto) {
    return `This action updates a #${id} socialTarget`;
  }

  remove(id: number) {
    return `This action removes a #${id} socialTarget`;
  }
}
