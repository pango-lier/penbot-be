import { RedisModule } from '@nestjs-modules/ioredis';
import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { EnvModule } from './env/env.module';
import { BullmqModule } from './bullmq/bullmq.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

import { PaginateModule } from './paginate/paginate.module';
import { AppGateway } from './app/app.gateway';
import { ArticlesModule } from './articles/articles.module';
import { SocialsModule } from './socials/socials.module';
import { PuppeteersModule } from './puppeteers/puppeteers.module';
import { LinksModule } from './links/links.module';
import { SettingsModule } from './settings/settings.module';
import { PaymentsModule } from './payments/payments.module';
import { CrawlersModule } from './crawlers/crawlers.module';
import { SocialTargetsModule } from './social-targets/social-targets.module';
import { PrintwayModule } from './printway/printway.module';

@Module({
  imports: [
    DatabaseModule,
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        ...configService.get('ioredis'),
      }),
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        ...configService.get('queue'),
      }),
    }),
    EnvModule,
    BullmqModule,
    UsersModule,
    AuthModule,
    PaginateModule,
    ArticlesModule,
    SocialsModule,
    PuppeteersModule,
    LinksModule,
    SettingsModule,
    PaymentsModule,
    CrawlersModule,
    SocialTargetsModule,
    PrintwayModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
