import { CrawlerLink } from '@crawlers/crawler-links/entities/crawler-link.entity';
import { Crawler } from '@crawlers/entities/crawler.entity';
import { Notification } from '@notifications/entities/notification.entity';
import { Social } from '@socials/entities/social.entity';
import { Account } from '@users/accounts/entities/account.entity';
import { Group } from '@users/groups/entities/group.entity';
import { Permission } from '@users/permissions/entities/permission.entity';
import { Role } from '@users/roles/entities/role.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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


  @OneToMany(() => Social, (a) => a.user, {
    nullable: true,
  })
  socials?: Social[];


  @ManyToMany(() => Permission, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinTable()
  permissions?: Permission[];

  @OneToMany(() => CrawlerLink, (a) => a.user, {
    nullable: true,
  })
  crawlerLinks?: CrawlerLink[];

  @OneToMany(() => Crawler, (a) => a.user, {
    nullable: true,
  })
  crawlers?: Crawler[];
}
