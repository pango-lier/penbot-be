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
  @JoinTable()
  crawlers: Crawler[];

  @OneToMany(() => Article, (article) => article.socialTarget, {
    nullable: true,
  })
  articles?: Article[];

  @ManyToMany(() => CrawlerLink, (s) => s.socialTargets, {
    nullable: true,
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinTable()
  crawlerLinks?: CrawlerLink[];

  @ManyToOne(() => Social, (u) => u.socialTarget, { nullable: true })
  social?: Social;
}
