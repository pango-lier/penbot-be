import { File } from '@files/entities/file.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
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
import { SocialTargetArticle } from '@social-target-articles/entities/social-target-article.entity';

@Entity()
export class Article {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', nullable: true })
  title?: string;

  @Column({ type: 'varchar', length: 2083, nullable: true })
  url?: string;

  @Column({ type: 'varchar', length: 2083, nullable: true })
  thumbnail?: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'varchar', length: 512, nullable: true })
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

  // @ManyToMany(() => SocialTarget, (s) => s.articles, { nullable: true })
  // @JoinTable({
  //   name: 'social_target_article',
  //   joinColumn: {
  //     name: 'articleId', // Column name for the current entity
  //     referencedColumnName: 'id', // The column on the Article entity to join
  //   },
  //   inverseJoinColumn: {
  //     name: 'socialTargetId', // Column name for the other entity (SocialTarget)
  //     referencedColumnName: 'id', // The column on the SocialTarget entity to join
  //   },
  // })
  // socialTargets?: SocialTarget[];

  @OneToMany(() => SocialTargetArticle, (s) => s.article, { nullable: true })
  socialTargetArticles?: SocialTargetArticle[];

  @ManyToOne(() => Crawler, (s) => s.articles, { nullable: true })
  crawler?: Crawler;

  @Column({ type: 'bigint', nullable: true })
  userId?: number;

  @ManyToOne(() => User, (s) => s.articles)
  user?: User;

  @ManyToMany(() => File, (s) => s.articles, { nullable: true })
  files?: File[];
}
