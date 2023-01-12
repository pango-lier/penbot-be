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
import {
  CrawlerLinkEnum,
  CrawlerLinkStatusEnum,
  QualityEnum,
  TypeFileEnum,
} from './crawler-link.enum';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class CrawlerLink {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  description: string;

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
