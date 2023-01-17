import { Link } from '@links/entities/link.entity';
import { Social } from '@socials/entities/social.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ArticleStatusEnum } from './article-status.enum';

@Entity()
export class Article {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', nullable: true })
  title?: string;

  @Column({ type: 'varchar', length: 2083, nullable: true })
  url?: string;

  @Column({ type: 'tinytext', nullable: true })
  description?: string;

  @Column({ type: 'text', nullable: true })
  content: string;

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

  @ManyToOne(() => Social, (social) => social.articles, {
    nullable: true,
  })
  social?: Social;

  @OneToMany(() => Link, (link) => link.article, { nullable: true })
  links?: Link[];
}
