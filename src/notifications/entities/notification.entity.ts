import { NotificationActionEnum } from '@notifications/enums/notification-action.enum';
import { NotificationStatusEnum } from '@notifications/enums/notification-status.enum';
import NotificationTagEnum from '@notifications/enums/notification-tag.enum';
import { User } from '@users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('notifications')
export class Notification {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id?: number;

  @Index()
  @Column({ type: 'bigint', nullable: true })
  senderId?: number;

  @ManyToOne(() => User, { nullable: true })
  sender?: User;

  @Column({ type: 'json', nullable: true })
  data: any;

  @Column({ type: 'text', nullable: true })
  message?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  title?: string;

  @Index()
  @Column({ type: 'varchar', length: 64, nullable: true })
  notifiableType?: string;

  @Index()
  @Column({ type: 'bigint', nullable: true })
  notifiableId?: number;

  @Column({ type: 'simple-array', nullable: true })
  tags?: NotificationTagEnum[];

  @Column({ type: 'enum', enum: NotificationStatusEnum, nullable: true })
  status?: NotificationStatusEnum;

  @Column({ type: 'enum', enum: NotificationActionEnum, nullable: true })
  action?: NotificationActionEnum;

  @Index()
  @Column({
    type: 'varchar',
    length: 64,
    nullable: true,
  })
  channel?: string;

  @ManyToMany(() => User, (user) => user.notifications)
  receivers?: User[];

  @Column({ type: 'timestamp', nullable: true })
  readAt?: Date;

  @Index()
  @CreateDateColumn({ type: 'timestamp', nullable: true })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: Date;
}
