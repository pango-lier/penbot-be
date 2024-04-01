import { User } from '@users/entities/user.entity';

export interface SocketUserData {
  id: string;
  socketId: string;
  user: Partial<User>;
}
