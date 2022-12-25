import { Injectable } from '@nestjs/common';
import { CreateSocialDto } from './dto/create-social.dto';
import { UpdateSocialDto } from './dto/update-social.dto';

@Injectable()
export class SocialsService {
  create(createSocialDto: CreateSocialDto) {
    return 'This action adds a new social';
  }

  findAll() {
    return `This action returns all socials`;
  }

  findOne(id: number) {
    return `This action returns a #${id} social`;
  }

  update(id: number, updateSocialDto: UpdateSocialDto) {
    return `This action updates a #${id} social`;
  }

  remove(id: number) {
    return `This action removes a #${id} social`;
  }
}
