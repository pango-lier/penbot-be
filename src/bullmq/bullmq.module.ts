import { Global, MiddlewareConsumer, Module } from '@nestjs/common';
import { DemoProcessor } from './demo.processor';
import { WriteLogProcessor } from './writeLog.processor';
import { BullModule, InjectQueue } from '@nestjs/bullmq';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  BullMQAdapter,
  ExpressAdapter,
  createBullBoard,
} from '@bull-board/express';
import { Queue } from 'bullmq';

const BullMQQueueRegisterModule = [
  BullModule.registerQueue({
    name: 'demo',
    // processors: [join(__dirname, 'queue-bull-mq/demo.processor.js')],
  }),
  BullModule.registerQueue({
    name: 'write-log',
  }),
  BullModule.registerQueue({
    name: 'browser',
  }),
  BullModule.registerQueue({
    name: 'crawler',
  }),
];
@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        ...configService.get('queue'),
        defaultJobOptions: {
          attempts: 3,
          removeOnComplete: {
            age: 24 * 3600 * 14,
          },
        },
      }),
    }),
    ...BullMQQueueRegisterModule,
  ],
  providers: [DemoProcessor, WriteLogProcessor],
  exports: [...BullMQQueueRegisterModule],
})
export class BullmqModule {
  serverAdapter = new ExpressAdapter();
  constructor(
    @InjectQueue('demo') private demoQueue: Queue,
    @InjectQueue('write-log') private writeLogQueue: Queue,
    @InjectQueue('browser') private browserQueue: Queue,
    @InjectQueue('crawler') private crawlerQueue: Queue,
  ) {
    this.serverAdapter.setBasePath('/api/admin/queues'); //http://localhost:3023/api/admin/queues/
    createBullBoard({
      queues: [
        new BullMQAdapter(demoQueue),
        new BullMQAdapter(writeLogQueue),
        new BullMQAdapter(browserQueue),
        new BullMQAdapter(crawlerQueue),
      ],
      serverAdapter: this.serverAdapter,
    });
    for (let index = 0; index < 1; index++) {
      this.demoQueue.add('Start', { ok: index + 'Test queue' });
      this.writeLogQueue.add('Start', { ok: index + 'Test queue' });
    }
  }

  configure(consumer: MiddlewareConsumer) {
    const bullBoardRouter = this.serverAdapter.getRouter();
    consumer.apply(bullBoardRouter).forRoutes('/admin/queues');
  }
}
