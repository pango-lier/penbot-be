import { InjectRedis } from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class SocketNotificationCountService {
  constructor(@InjectRedis() private readonly redis: Redis) {}
  NOTIFICATION_COUNT = 'notification_count';

  async inc(userId: string) {
    const count =
      (await this.redis.hget(this.NOTIFICATION_COUNT, userId)) || '0';
    await this.redis.hset(this.NOTIFICATION_COUNT, userId, parseInt(count) + 1);
    return parseInt(count) + 1;
  }

  async get(userId: string) {
    return await this.redis.hget(this.NOTIFICATION_COUNT, userId);
  }

  async clear(userId: string) {
    await this.redis.hdel(this.NOTIFICATION_COUNT, userId);
    return '0';
  }

  async flushAll() {
    const sockets = await this.redis.hgetall(this.NOTIFICATION_COUNT);
    for (const socket of Object.keys(sockets)) {
      await this.redis.hdel(this.NOTIFICATION_COUNT, socket);
    }
    return 1;
  }
}
