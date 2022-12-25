import { Article } from 'src/articles/entities/article.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { LinkEnum } from './link.enum';

@Entity()
export class Link {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar' })
  url: string;

  @Column({ type: 'varchar', nullable: true })
  thumb?: string;

  @Column({ type: 'enum', enum: LinkEnum, default: LinkEnum.NONE })
  typeLink: LinkEnum;

  @Column({ type: 'bigint', default: 0, unsigned: true })
  size: number;

  @Column({ type: 'tinytext', nullable: true })
  description?: string;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt?: Date;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => Article, (article) => article.links)
  article: Article;
}
