import { InjectRedis } from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { SocketUserData } from './dto/socket-user-data.interface';
import { User } from '@users/entities/user.entity';

@Injectable()
export class SocketManagerOnlineService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  async addUser(socketId: string, user: Partial<User>) {
    const socketData: SocketUserData = {
      id: `${user.id}`,
      socketId,
      user: user,
    };
    console.warn(`${user.name} is online`);
    await this.redis.hset(`online`, socketId, JSON.stringify(socketData));
    return await this.redis.hget(`online`, socketId);
  }

  async removeSocket(socketId: string) {
    return await this.redis.hdel(`online`, socketId);
  }

  async flushSocket() {
    const sockets = await this.redis.hgetall(`online`);
    for (const socket of Object.keys(sockets)) {
      await this.redis.hdel('online', socket);
    }
    return 1;
  }

  async getUser(socketId: string): Promise<SocketUserData> {
    const data = await this.redis.hget(`online`, socketId);
    return JSON.parse(data);
  }

  async getSocketIds(userIds: string[]) {
    const sockets = await this.redis.hgetall(`online`);
    const socketIds = [];
    for (const socket of Object.keys(sockets)) {
      const user: SocketUserData = JSON.parse(sockets[socket]);
      if (userIds.includes(`${user.id}`)) {
        socketIds.push(socket);
      }
    }
    return socketIds;
  }
}
