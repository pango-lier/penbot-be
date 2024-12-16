import { Article } from '@articles/entities/article.entity';
import { Crawler } from '@crawlers/entities/crawler.entity';
import { Social } from '@socials/entities/social.entity';
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
import { CrawlerLink } from '../../crawlers/crawler-links/entities/crawler-link.entity';
import { SocialTargetArticle } from '@social-target-articles/entities/social-target-article.entity';

@Entity()
export class SocialTarget {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'varchar', nullable: true })
  name?: string;

  @Column({ type: 'varchar', length: 2083 })
  link: string;

  @Column({ type: 'varchar', default: 'group' })
  targetType?: string;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt?: Date;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToMany(() => Crawler, (u) => u.socialTargets, {
    nullable: true,
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinTable({ name: 'social_target_crawler' })
  crawlers: Crawler[];

  @ManyToMany(() => Article, (s) => s.socialTargets, {
    nullable: true,
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinTable({ name: 'social_target_article' })
  articles?: Article[];

  @ManyToMany(() => CrawlerLink, (s) => s.socialTargets, {
    nullable: true,
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinTable({ name: 'social_target_crawler_link' })
  crawlerLinks?: CrawlerLink[];

  @ManyToOne(() => Social, (u) => u.socialTarget, { nullable: true })
  social?: Social;

  @OneToMany(() => SocialTargetArticle, (u) => u.socialTarget, {
    nullable: true,
  })
  socialTargetArticles?: SocialTargetArticle[];
}
