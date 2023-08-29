
import { Processor, WorkerHost, OnWorkerEvent } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { PrintwayService } from '@printway/printway.service';
import { Job } from 'bullmq';

@Processor('image', {})
export class ImageProcessor extends WorkerHost {
  private readonly logger = new Logger(ImageProcessor.name);
  constructor(private readonly printWayService: PrintwayService) {
    super();
  }

  @OnWorkerEvent('active')
  OnWorkerEvent(job: Job) {
    console.log(
      `OnWorkerEvent  ${job.id} of type ${job.name} with data ${job.data}...`,
    );
  }

  async process(job: Job<any, any, string>, token?: string) {
    await this.printWayService.runDownload();
    console.log(
      `Processing job ${job.id} of type ${job.name} with data ${job.data}... ${token}`,
    );
  }
}
