import {
  CreateDateColumn,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id?: number;

  @Index()
  @CreateDateColumn({ type: 'timestamp', nullable: true, select: false })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true, select: false })
  updatedAt?: Date;
}
