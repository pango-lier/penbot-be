import { Type } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Printway {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  search?: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  url?: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  thumb256?: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  thumb512?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  title: string;

  @Column({ type: 'varchar', length: 512, nullable: true })
  location?: string;

  @Column({ type: 'json', nullable: true })
  data?: any;

  @Column({ type: 'bigint', nullable: true })
  width?: number;

  @Column({ type: 'bigint', nullable: true })
  height?: number;

  @Type(() => Date)
  @CreateDateColumn({ type: 'timestamp' })
  createdAt?: Date;

  @Type(() => Date)
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt?: Date;
}
