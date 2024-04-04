import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Mailer extends CoreEntity {
  @Column({ type: 'varchar', nullable: true })
  city?: string;

  @Column({ type: 'varchar', nullable: true })
  address?: string;

  @Column({ type: 'varchar', nullable: true, length: 3 })
  state?: string;

  @Column({ type: 'varchar', nullable: true, length: 3 })
  country?: string;

  @Column({ type: 'varchar', nullable: true })
  name?: string;

  @Column({ type: 'varchar', length: 125 })
  email: string;

  @Column({ type: 'boolean', default: false })
  active?: boolean;
}
