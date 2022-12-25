import { Social } from 'src/socials/entities/social.entity';
import { Group } from 'src/users/groups/entities/group.entity';
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

@Entity()
export class Account {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', nullable: true })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  proxyId: string;

  @Column({ type: 'varchar', nullable: true })
  proxyType: string;

  @Column('bool', { default: true })
  active?: boolean;

  @Column({ type: 'timestamp', nullable: true })
  expiresAt?: Date;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt?: Date;

  @Column({ type: 'bigint', nullable: true })
  groupId: number;

  @ManyToOne(() => Group, (group) => group.accounts)
  group?: Group;

  @OneToMany(() => Social, (social) => social.account, {
    nullable: true,
  })
  socials?: Social[];
}
