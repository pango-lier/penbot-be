
import { Proxy } from '@users/proxies/entities/proxy.entity';
import { User } from '@users/entities/user.entity';
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
import { GroupEnum } from './group.enum';

@Entity()
export class Group {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  secretName?: string;

  @Column({ type: 'varchar', nullable: true })
  secretKey?: string;

  @Column({ type: 'enum', enum: GroupEnum, default: GroupEnum.NONE })
  groupType: GroupEnum;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt?: Date;

  @Column({ type: 'bigint' })
  userId: number;

  @OneToMany(() => Proxy, (proxy) => proxy.group)
  proxies?: Proxy[];

  @ManyToOne(() => User, (user) => user.groups)
  user?: User;
}
