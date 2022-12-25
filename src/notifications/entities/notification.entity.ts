import { Type } from 'class-transformer';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('notifications')
export class Notification {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ default: 'notifications' })
  type?: string;

  @Column({ default: null, nullable: true })
  notifiableId: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  status: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  message?: string;

  @Column({ type: 'text', nullable: true })
  data?: string;

  @Type(() => Date)
  @Column({ type: 'timestamp', nullable: true })
  readId?: Date;

  @Column({ nullable: true, type: 'bigint' })
  userId?: number;

  @Type(() => Date)
  @CreateDateColumn({ type: 'timestamp' })
  createdAt?: Date;

  @Type(() => Date)
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt?: Date;

  @ManyToOne(() => User, (user) => user.notifications, { nullable: true })
  user?: User;
}
