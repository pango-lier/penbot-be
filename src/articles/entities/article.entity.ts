import { Link } from '@links/entities/link.entity';
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
import { ArticleStatusEnum } from './article-status.enum';
import { SocialTarget } from '@social-targets/entities/social-target.entity';
import { Crawler } from '../../crawlers/entities/crawler.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Article {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', nullable: true })
  title?: string;

  @Column({ type: 'varchar', length: 2083, nullable: true })
  url?: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'text', nullable: true })
  tags: string;

  @Column({
    type: 'enum',
    enum: ArticleStatusEnum,
    default: ArticleStatusEnum.NONE,
  })
  status: ArticleStatusEnum;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt?: Date;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToMany(() => SocialTarget, (s) => s.crawlerLinks, { nullable: true })
  socialTargets?: SocialTarget[];

  @ManyToOne(() => Crawler, (s) => s.articles, { nullable: true })
  crawler?: Crawler;

  @Column({ type: 'bigint', nullable: true })
  userId?: number;

  @ManyToOne(() => User, (s) => s.articles)
  user?: User;

  @ManyToMany(() => Link, (s) => s.articles, { nullable: true })
  links?: Link[];
}
