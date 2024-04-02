import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMailDto } from './dto/create-mail.dto';
import { UpdateMailDto } from './dto/update-mail.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { google } from 'googleapis';
import { InjectRepository } from '@nestjs/typeorm';
import { Mail } from './entities/mail.entity';
import { Repository } from 'typeorm';
import { EnumMailType } from './type/mail.enum';
import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';
import { Options } from 'nodemailer/lib/smtp-transport';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
    @InjectRepository(Mail) private readonly mailService: Repository<Mail>,
    @InjectQueue('mail') private readonly mailQueue: Queue,
  ) {}
  async create(createMailDto: CreateMailDto) {
    const mail = this.mailService.create(createMailDto);
    return await this.mailService.save(mail);
  }

  async sendQuestion(createMailDto: CreateMailDto) {
    createMailDto.type = EnumMailType.Question;
    const mail = await this.create(createMailDto);
    this.mailQueue.add(EnumMailType.EmailOtp, {
      mail,
    });
  }

  async sendEmailOtp(
    email: string,
    meta: { username: string; code: string },
    userId?: number,
  ) {
    const mail = await this.create({
      email,
      meta,
      userId,
      subject: `Your One-Time Password (OTP)`,
      type: EnumMailType.EmailOtp,
    } as any);
    this.mailQueue.add(EnumMailType.EmailOtp, {
      mail,
    });
    return mail;
  }

  async sendAdvert(
    email: string,
    meta: { username: string; code: string },
    userId?: number,
  ) {
    const mail = await this.create({
      email,
      meta,
      userId,
      subject: `Discover Custom Gifts for Your Loved Ones at Cutom.us`,
      type: EnumMailType.Advert,
    } as any);
    this.mailQueue.add(EnumMailType.EmailOtp, {
      mail,
    });
    return mail;
  }

  // async EmailLinkOtp(
  //   email: string,
  //   meta: { username: string; code: string },
  //   user_id?: number,
  // ) {
  //   const mail = await this.create({
  //     email,
  //     meta,
  //     user_id,
  //     subject: `Account Confirmation: Please Verify Your Email`,
  //     type: EnumMailType.EmailLinkOtp,
  //   });
  //   this.mailQueue.add(EnumMailType.EmailLinkOtp, {
  //     mail,
  //   });
  //   return mail;
  // }

  async send(mail: CreateMailDto) {
    try {
      const list = this.configService.get('mail.toAdmin').split(',');
      const contextSetting = await this.contextSetting();
      await this.setGmailTransport();
      await this.mailerService.sendMail({
        transporterName: 'gmail',
        to: mail.email,
        from: list,
        subject: mail.subject,
        template: mail.type, // The `.pug` or `.hbs` extension is appended automatically.
        context: {
          mail: {
            ...mail,
            meta: {
              ...mail.meta,
              username: mail.meta?.username,
            },
          },
          ...contextSetting,
        },
      });
    } catch (error) {
      throw new HttpException(
        error?.message || 'Send email is failed .',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async contextSetting() {
    const socials: any = {};

    return {
      siteTitle: 'The Cutom.us',
      website: 'https://cutom.us/',
      logo: '',
      formattedAddress: '',
      ...socials,
    };
  }

  findAll() {
    return `This action returns all mail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mail`;
  }

  update(id: number, updateMailDto: UpdateMailDto) {
    return `This action updates a #${id} mail`;
  }

  remove(id: number) {
    return `This action removes a #${id} mail`;
  }

  private async setGmailTransport() {
    const OAuth2 = google.auth.OAuth2;
    const oauth2Client = new OAuth2(
      this.configService.get('CLIENT_ID'),
      this.configService.get('CLIENT_SECRET'),
      'https://developers.google.com/oauthplayground',
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.REFRESH_TOKEN,
    });

    const accessToken: string = await new Promise((resolve, reject) => {
      oauth2Client.getAccessToken((err, token) => {
        if (err) {
          reject('Failed to create access token');
        }
        resolve(token);
      });
    });

    const config: Options = {
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: this.configService.get('EMAIL'),
        clientId: this.configService.get('CLIENT_ID'),
        clientSecret: this.configService.get('CLIENT_SECRET'),
        accessToken,
      },
    };
    return this.mailerService.addTransporter('gmail', config);
  }
}
