import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column('varchar', { length: 191, nullable: true })
  name?: string;

  @Column('varchar', { length: 191, unique: true, nullable: true })
  username?: string;

  @Column('varchar', { length: 100, unique: true })
  email: string;

  @Column({ length: 128, nullable: true })
  password: string;

  @Column({ length: 100, nullable: true })
  rememberToken?: string;

  @Column({ nullable: true })
  refreshToken?: string;

  @Column('bool', { default: true })
  active?: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true })
  omz_user_id?: string;

  @Column({ type: 'bigint', nullable: true, unsigned: true })
  company_id?: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  role_name?: string;

  @Column({ type: 'varchar', length: 2083, nullable: true })
  avatar?: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deleted_at?: Date;
}
