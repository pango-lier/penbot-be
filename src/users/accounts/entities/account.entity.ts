
import { CrawlerLink } from '@crawlers/crawler-links/entities/crawler-link.entity';
import { Social } from '@socials/entities/social.entity';
import { User } from '@users/entities/user.entity';
import { Group } from '@users/groups/entities/group.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Account {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', nullable: true })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  proxyId: string;

  @Column({ type: 'varchar', nullable: true })
  proxyType: string;

  @Column('bool', { default: true })
  active?: boolean;

  @Column({ type: 'timestamp', nullable: true })
  expiresAt?: Date;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt?: Date;

  @Column({ type: 'bigint', nullable: true })
  groupId: number;

  @ManyToOne(() => Group, (group) => group.accounts, { cascade: true })
  @JoinColumn()
  group?: Group;

  @Column({ type: 'bigint', nullable: true })
  userId: number;

  @ManyToOne(() => User, (u) => u.accounts)
  user?: User;

  @OneToMany(() => Social, (social) => social.account, {
    nullable: true,
  })
  socials?: Social[];

  @OneToMany(() => CrawlerLink, (s) => s.account, {
    nullable: true,
  })
  crawlers?: CrawlerLink[];
}
