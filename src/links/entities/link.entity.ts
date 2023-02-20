import { Article } from '@articles/entities/article.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { LinkEnum } from './link.enum';

@Entity()
export class Link {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 2083 })
  url: string;

  @Column({ type: 'varchar', length: 2083, nullable: true })
  urlLocal?: string;

  @Column({ type: 'varchar', length: 2083, nullable: true })
  thumbnail?: string;

  @Column({ type: 'varchar', nullable: true })
  thumb?: string;

  @Column({ type: 'enum', enum: LinkEnum, default: LinkEnum.NONE })
  typeLink: LinkEnum;

  @Column({ type: 'bigint', default: 0, unsigned: true, nullable: true })
  size: number;

  @Column({ type: 'tinytext', nullable: true })
  description?: string;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt?: Date;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToMany(() => Article, (s) => s.links, {
    nullable: true,
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinTable()
  articles?: Article[];
}
