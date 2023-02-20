import { CrawlerLink } from '@crawlers/crawler-links/entities/crawler-link.entity';
import { CrawlerStatusEnum } from '@crawlers/enum/crawler-link.enum';
import { SocialTarget } from '@social-targets/entities/social-target.entity';
import { Social } from '@socials/entities/social.entity';
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
import { Article } from '../../articles/entities/article.entity';

@Entity()
export class Crawler {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  type?: string;

  @Column({ type: 'bigint', nullable: true })
  size?: number;

  @Column({ type: 'text', nullable: true })
  tags?: string;

  @Column({
    type: 'enum',
    enum: CrawlerStatusEnum,
    nullable: true,
  })
  status?: CrawlerStatusEnum;

  @Column({ type: 'text', nullable: true })
  message?: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'varchar', length: 2083, nullable: true })
  links?: string;

  @Column({ type: 'varchar', length: 2083, nullable: true })
  thumbnail?: string;

  @Column({ type: 'varchar', length: 2083, nullable: true })
  linkDownloaded?: string;

  @Column({ type: 'json', nullable: true })
  meta?: string;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt?: Date;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Column({ type: 'bigint', nullable: true })
  crawlerLinkId?: number;

  @ManyToOne(() => CrawlerLink, (s) => s.crawler, { nullable: true })
  crawlerLinks?: CrawlerLink[];

  @ManyToMany(() => Social, (s) => s.crawlers, { nullable: true })
  socials?: Social[];

  @ManyToMany(() => Social, (s) => s.crawlers, { nullable: true })
  socialTargets?: SocialTarget[];

  @Column({ type: 'bigint', nullable: true })
  userId?: number;

  @OneToMany(() => Article, (a) => a.crawler, {
    nullable: true,
  })
  articles?: Article[];

  @OneToMany(() => User, (s) => s.crawlers, { nullable: true })
  user?: User;
}
