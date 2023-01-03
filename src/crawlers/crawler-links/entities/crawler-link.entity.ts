import { CrawlerConfig } from 'src/crawlers/crawler-configs/entities/crawler-config.entity';
import { Crawler } from 'src/crawlers/entities/crawler.entity';
import { Social } from 'src/socials/entities/social.entity';
import { Account } from 'src/users/accounts/entities/account.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CrawlerLinkEnum } from './crawler-link.enum';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class CrawlerLink {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  description: string;

  @Column({ type: 'varchar', nullable: true })
  status?: string;

  @Column({
    type: 'enum',
    default: CrawlerLinkEnum.None,
    enum: CrawlerLinkEnum,
    nullable: true,
  })
  type?: CrawlerLinkEnum;

  @Column({ type: 'varchar', nullable: true })
  target?: string;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt?: Date;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  runStartAt?: Date;

  @Column({ type: 'timestamp', nullable: true })
  runEndAt?: Date;

  @OneToMany(() => Social, (s) => s.crawlerLinks, { nullable: true })
  social?: Social;

  @OneToMany(() => Crawler, (s) => s.crawlerLinks, { nullable: true })
  crawler?: Crawler;

  @ManyToOne(() => Account, (account) => account.crawlers, {
    nullable: true,
  })
  account?: Account;

  @ManyToMany(() => CrawlerConfig)
  crawlerConfigs?: CrawlerConfig[];

  @Column({ type: 'bigint', nullable: true })
  userId?: number;

  @OneToMany(() => User, (s) => s.crawlerLinks, { nullable: true })
  user?: User;
}
