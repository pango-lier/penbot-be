import { Processor, WorkerHost, OnWorkerEvent } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { FacebookService } from '@puppeteers/facebook/facebook.service';
import { Job } from 'bullmq';
import { PuppeteersService } from '../puppeteers.service';

@Processor('browser', {
  concurrency: 1,
  runRetryDelay: 300, // retry 200s
})
export class BrowserQueue extends WorkerHost {
  private readonly logger = new Logger(BrowserQueue.name);
  constructor(private readonly puppeteer: PuppeteersService) {
    super();
  }

  @OnWorkerEvent('active')
  OnWorkerEvent(job: Job) {
    this.logger.debug(`BrowserQueue ${job.name} is Active`);
  }

  @OnWorkerEvent('completed')
  OnWorkerEventCompleted(job: Job) {
    this.logger.debug(`BrowserQueue ${job.name} is completed`);
  }

  @OnWorkerEvent('error')
  OnWorkerEventFailed(job: Job) {
    this.logger.debug(`BrowserQueue ${job.name} is error`);
  }

  async process(job: Job<any, any, string>, token?: string) {
    switch (job.name) {
      case 'facebook-service':
        await this.puppeteer.runMethodQueue(job.data);
        break;
      case 'google-service':
        break;
      default:
        this.logger.debug(`Job name is not founded`);
        break;
    }
    console.log(`Processing job ${job.id} of type ${job.name}`);
  }

  async uploadImageToCdnListing(id, userId) {}
}
