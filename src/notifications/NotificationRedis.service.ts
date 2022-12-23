// import { Injectable } from '@nestjs/common';
// // import { flushProcessingTask } from '.';

// import { InjectRedis, Redis } from '@nestjs-modules/ioredis';

// @Injectable()
// export class NotificationRedis {
//   constructor(@InjectRedis() private readonly redis: Redis) {}

//   async addUser(user) {
//     return await this.redis.hset(`online`, user.socketId, user.id);
//   }
//   async removeUser(socketId) {
//     return await this.redis.hdel(`online`, socketId);
//   }
//   async getUser(userId) {
//     const sockets = await this.redis.hgetall(`online`);
//     let socketIds = [];
//     for (let socket of Object.keys(sockets)) {
//       if (parseInt(sockets[socket]) === parseInt(userId)) {
//         socketIds.push(socket);
//       }
//     }
//     return socketIds;
//   }

//   async flushSocket() {
//     const sockets = await this.redis.hgetall(`online`);
//     for (let socket of Object.keys(sockets)) {
//       await this.redis.hdel('online', socket);
//     }
//     return 1;
//   }

//   async inc(userId) {
//     if (userId !== null) {
//       const count = await this.redis.hincrby(
//         `user${userId}`,
//         'notification_count',
//         1,
//       );
//       ioEmit.sendUser('notification_count', userId, { count });
//       return count;
//     }
//     return 0;
//   }
//   async get(userId) {
//     if (userId !== null) {
//       const count = await this.redis.hget(
//         `user${userId}`,
//         'notification_count',
//       );
//       ioEmit.sendUser('notification_count', userId, { count });
//       return count;
//     }
//     return 0;
//   }
//   async flush(userId) {
//     if (userId !== null) {
//       const count = await flushProcessingTask(
//         `user${userId}`,
//         'notification_count',
//       );
//       ioEmit.sendUser('notification_count', userId, { count });
//       return count;
//     }
//   }
// }
// export default new NotificationRedis();
