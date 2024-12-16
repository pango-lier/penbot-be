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
import { FileEnum } from './file.enum';

@Entity()
export class File {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 2083 })
  url: string;

  @Column({ type: 'varchar', length: 2083, nullable: true })
  urlLocal?: string;

  @Column({ type: 'varchar', length: 2083, nullable: true })
  thumbnail?: string;

  @Column({ type: 'enum', enum: FileEnum, default: FileEnum.NONE })
  typeLink: FileEnum;

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

  @ManyToMany(() => Article, (s) => s.files, {
    nullable: true,
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinTable({ name: 'file_article' })
  articles?: Article[];
}
