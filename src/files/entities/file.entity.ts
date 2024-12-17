import { Article } from '@articles/entities/article.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class File {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 1024 })
  url: string;

  @Column({ type: 'varchar', length: 1024, nullable: true })
  local?: string;

  @Column({ type: 'varchar', length: 1024, nullable: true })
  thumbnail?: string;

  @Column({ type: 'varchar', length: 64, nullable: true })
  type?: string;

  @Column({ type: 'bigint', default: 0, unsigned: true, nullable: true })
  size: number;

  @Column({ type: 'varchar', nullable: true })
  name?: string;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt?: Date;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToMany(() => Article, (s) => s.files, {
    nullable: true,
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinTable({ name: 'file_article' })
  articles?: Article[];
}
