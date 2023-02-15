import { Module } from '@nestjs/common';
import { ProxiesService } from './proxies.service';
import { ProxiesController } from './proxies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proxy } from './entities/proxy.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Proxy])],
  controllers: [ProxiesController],
  providers: [ProxiesService],
})
export class ProxiesModule {}
