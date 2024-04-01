import { Global, Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { SettingsModule } from 'src/settings/settings.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mail } from './entities/mail.entity';
import { MailProcessor } from './queue/mail.processor';
import { join } from 'path';

@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          transport: {
            host: configService.get('mail.host'),
            port: configService.get('mail.port'),
            // secure: true, // upgrade later with STARTTLS
            auth: {
              user: configService.get('mail.username'),
              pass: configService.get('mail.password'),
            },
          },
          defaults: {
            from: configService.get('mail.address'),
          },
          template: {
            dir: join(__dirname, 'templates'),
            adapter: new HandlebarsAdapter(), // or new PugAdapter()
            options: {
              strict: true,
            },
          },
        };
      },
    }),
    TypeOrmModule.forFeature([Mail]),
    SettingsModule,
  ],
  controllers: [MailController],
  providers: [MailService, MailProcessor],
  exports: [MailService],
})
export class MailModule {}
