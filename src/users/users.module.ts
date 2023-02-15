import { Global, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesModule } from './roles/roles.module';
import { ProxiesModule } from './proxies/proxies.module';
import { GroupsModule } from './groups/groups.module';
import { PermissionsModule } from './permissions/permissions.module';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User]), RolesModule, ProxiesModule, GroupsModule, PermissionsModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [TypeOrmModule.forFeature([User]), UsersService],
})
export class UsersModule {}
