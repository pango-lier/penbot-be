import { Processor, WorkerHost, OnWorkerEvent } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';

@Processor('browser', {
  concurrency: 5,
  runRetryDelay: 300, // retry 200s
})
export class CrawlerQueue extends WorkerHost {
  private readonly logger = new Logger(CrawlerQueue.name);
  constructor() {
    super();
  }

  @OnWorkerEvent('active')
  OnWorkerEvent(job: Job) {
    this.logger.debug(
      `OnWorkerEvent  ${job.id} of type ${job.name} with data ${job.data}...`,
    );
  }

  @OnWorkerEvent('error')
  OnWorkerEventFailed(job: Job) {
    this.logger.debug(
      `Error OnWorkerEvent  ${job.id} of type ${job.name} with data ${job.data}...`,
    );
  }

  async process(job: Job<any, any, string>, token?: string) {
    switch (job.name) {
      case 'upload-image-to-cdn-listing':
        break;
      default:
        this.logger.debug(
          `Job name is not founded. OnWorkerEvent  ${job.id} of type ${job.name} with data ${job.data}...`,
        );
        break;
    }
    console.log(
      `Processing job ${job.id} of type ${job.name} with data ${job.data}... ${token}`,
    );
  }

  async uploadImageToCdnListing(id, userId) {}
}
