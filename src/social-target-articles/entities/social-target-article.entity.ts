import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SocialTargetArticleStatusEnum } from './social-target-article.enum';
import { Article } from '@articles/entities/article.entity';
import { SocialTarget } from '@social-targets/entities/social-target.entity';

@Entity()
export class SocialTargetArticle {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'varchar', nullable: true })
  message?: string;

  @Column({
    type: 'enum',
    default: SocialTargetArticleStatusEnum.None,
    enum: SocialTargetArticleStatusEnum,
    nullable: true,
  })
  status?: SocialTargetArticleStatusEnum;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt?: Date;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Column({ type: 'bigint', nullable: true })
  articleId?: number;

  @ManyToOne(() => Article, (s) => s.socialTargetArticles, {
    nullable: true,
  })
  @JoinColumn({ name: 'articleId' })
  article?: Article;

  @Column({ type: 'bigint', nullable: true, unsigned: true })
  socialTargetId?: number;

  @ManyToOne(() => SocialTarget, (s) => s.socialTargetArticles, {
    nullable: true,
  })
  @JoinColumn({ name: 'socialTargetId' })
  socialTarget?: SocialTarget;
}
