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

export enum ProxyType {
  HTTP = 'http',
  HTTPS = 'https',
  SOCKS4 = 'socks4',
  SOCKS5 = 'socks5',
}

@Entity()
export class Proxy {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', nullable: true })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  proxyId: string;

  @Column({ type: 'enum', enum: ProxyType, nullable: true })
  proxyType: ProxyType;

  @Column({ type: 'varchar', nullable: true })
  host: string;

  @Column({ type: 'int', unsigned: true, nullable: true })
  port: number;

  @Column({ type: 'varchar', nullable: true })
  username: string;

  @Column({ type: 'varchar', nullable: true })
  password: string;

  @Column({ type: 'varchar', nullable: true, length: 3 })
  country_code: string;

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

  @ManyToOne(() => Group, (group) => group.proxies, { cascade: true })
  @JoinColumn()
  group?: Group;

  @Column({ type: 'bigint', nullable: true })
  userId: number;

  @ManyToOne(() => User, (u) => u.proxies)
  user?: User;

  @OneToMany(() => Social, (social) => social.proxy, {
    nullable: true,
  })
  socials?: Social[];

  @OneToMany(() => CrawlerLink, (s) => s.proxy, {
    nullable: true,
  })
  crawlers?: CrawlerLink[];
}
