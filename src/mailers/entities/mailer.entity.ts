import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, Index } from 'typeorm';

@Entity()
export class Mailer extends CoreEntity {
  @Column({ type: 'varchar', nullable: true })
  city?: string;

  @Column({ type: 'varchar', nullable: true, length: 128 })
  zip?: string;

  @Column({ type: 'varchar', nullable: true })
  formatted_address?: string;

  @Column({ type: 'varchar', nullable: true })
  address?: string;

  @Column({ type: 'varchar', nullable: true, length: 3 })
  state?: string;

  @Column({ type: 'varchar', nullable: true, length: 3 })
  country?: string;

  @Column({ type: 'varchar', nullable: true })
  name?: string;

  @Column({ type: 'varchar', nullable: true, length: 128 })
  firstName?: string;

  @Column({ type: 'varchar', nullable: true, length: 128 })
  lasName?: string;

  @Index()
  @Column({ type: 'varchar', length: 125, unique: true })
  email: string;

  @Column({ type: 'boolean', default: false })
  active?: boolean;
}
