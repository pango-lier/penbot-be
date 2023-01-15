import { User } from '../../users/entities/user.entity';

export type AuthenticatedUser = Pick<
  User,
  'id' | 'name' | 'username' | 'email'
>;

export interface ICurrentUser {
  id?: string | null;
  username?: string | null;
  email?: string | null;
  name?: string | null;
}
