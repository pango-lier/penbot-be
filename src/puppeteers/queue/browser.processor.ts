import { Processor, WorkerHost, OnWorkerEvent } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { FacebookService } from '@puppeteers/facebook/facebook.service';
import { Job } from 'bullmq';

@Processor('browser', {
  concurrency: 1,
  runRetryDelay: 300, // retry 200s
})
export class BrowserQueue extends WorkerHost {
  private readonly logger = new Logger(BrowserQueue.name);
  constructor(private readonly facebook: FacebookService) {
    super();
  }

  @OnWorkerEvent('active')
  OnWorkerEvent(job: Job) {
    this.logger.debug(`OnWorker Active  ${job.id} of type ${job.name}`);
  }

  @OnWorkerEvent('completed')
  OnWorkerEventCompleted(job: Job) {
    this.logger.debug(`OnWorkerEvent Completed  ${job.id} of type ${job.name}`);
  }

  @OnWorkerEvent('error')
  OnWorkerEventFailed(job: Job) {
    this.logger.debug(`Error OnWorkerEvent  ${job.id} of type ${job.name}`);
  }

  async process(job: Job<any, any, string>, token?: string) {
    switch (job.name) {
      case 'facebook-service':
        await this.facebook.runMethodQueue(job.data);
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
