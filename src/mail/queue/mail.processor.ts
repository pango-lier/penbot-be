import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { MailService } from '../mail.service';
import { EnumMailType } from '../type/mail.enum';

@Processor('mail', { concurrency: 4 })
export class MailProcessor extends WorkerHost {
  constructor(private readonly mailService: MailService) {
    super();
  }

  @OnWorkerEvent('active')
  OnWorkerEvent(job: Job) {}

  async process(job: Job<any, any, string>, token?: string) {
    switch (job.name) {
      default:
      case EnumMailType.EmailOtp:
        await this.mailService.send(job.data.mail);
        break;
    }
  }
}
