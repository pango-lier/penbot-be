import { CrawlerConfig } from '@crawlers/crawler-configs/entities/crawler-config.entity';
import { Crawler } from '@crawlers/entities/crawler.entity';
import { Social } from '@socials/entities/social.entity';
import { Proxy } from '@users/proxies/entities/proxy.entity';
import { User } from '@users/entities/user.entity';
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
import {
  CrawlerLinkEnum,
  CrawlerLinkStatusEnum,
  QualityEnum,
  TypeFileEnum,
} from './crawler-link.enum';
import { SocialTarget } from '../../../social-targets/entities/social-target.entity';

@Entity()
export class CrawlerLink {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'varchar', nullable: true })
  name: string;

  @Column({ type: 'bigint', nullable: true, default: 1 })
  limitCrawl: number;

  @Column({ type: 'bigint', nullable: true, default: 0 })
  countCrawl: number;

  @Column({ type: 'text', nullable: true })
  message?: string;

  @Column({
    type: 'enum',
    default: CrawlerLinkStatusEnum.None,
    enum: CrawlerLinkStatusEnum,
    nullable: true,
  })
  status?: CrawlerLinkStatusEnum;

  @Column({
    type: 'enum',
    enum: CrawlerLinkEnum,
    nullable: true,
  })
  type?: CrawlerLinkEnum;

  @Column({
    type: 'enum',
    enum: QualityEnum,
    default: QualityEnum.Video720p,
    nullable: true,
  })
  quality?: QualityEnum;

  @Column({
    type: 'enum',
    enum: TypeFileEnum,
    default: TypeFileEnum.FullAudioVideo,
    nullable: true,
  })
  typeFile?: TypeFileEnum;

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

  @ManyToMany(() => SocialTarget, (s) => s.crawlerLinks, { nullable: true })
  socialTargets?: SocialTarget[];

  @OneToMany(() => Crawler, (s) => s.crawlerLinks, { nullable: true })
  crawler?: Crawler;

  @ManyToOne(() => Proxy, (proxy) => proxy.crawlers, {
    nullable: true,
  })
  proxy?: Proxy;

  @ManyToMany(() => CrawlerConfig)
  crawlerConfigs?: CrawlerConfig[];

  @Column({ type: 'bigint', nullable: true })
  userId?: number;

  @OneToMany(() => User, (s) => s.crawlerLinks, { nullable: true })
  user?: User;
}
