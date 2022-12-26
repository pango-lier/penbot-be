import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Group } from '../groups/entities/group.entity';
import { Role } from '../roles/entities/role.entity';
import { Notification } from 'src/notifications/entities/notification.entity';
import { Permission } from '../permissions/entities/permission.entity';
import { Account } from '../accounts/entities/account.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column('varchar', { length: 191, nullable: true })
  name?: string;

  @Column('varchar', { length: 191, unique: true, nullable: true })
  username?: string;

  @Column('varchar', { length: 100, unique: true })
  email: string;

  @Column({ length: 128, nullable: true })
  password: string;

  @Column({ length: 100, nullable: true })
  rememberToken?: string;

  @Column({ nullable: true })
  refreshToken?: string;

  @Column('bool', { default: true })
  active?: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true })
  role_name?: string;

  @Column({ type: 'varchar', length: 2083, nullable: true })
  avatar?: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deleted_at?: Date;

  @OneToMany(() => Notification, (notification) => notification.user, {
    nullable: true,
  })
  notifications?: Notification[];

  @ManyToMany(() => Role, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinTable()
  roles: Role[];

  @OneToMany(() => Group, (group) => group.user, {
    nullable: true,
  })
  groups?: Group[];

  @OneToMany(() => Account, (a) => a.user, {
    nullable: true,
  })
  accounts?: Account[];

  @ManyToMany(() => Permission, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinTable()
  permissions?: Permission[];
}
