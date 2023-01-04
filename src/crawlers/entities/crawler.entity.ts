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
import { CrawlerLink } from '../crawler-links/entities/crawler-link.entity';
import { User } from 'src/users/entities/user.entity';
import { CrawlerStatusEnum } from '../enum/crawler-link.enum';

@Entity()
export class Crawler {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  type?: string;

  @Column({ type: 'bigint', nullable: true })
  size?: number;

  @Column({ type: 'varchar', nullable: true })
  tags?: string;

  @Column({
    type: 'enum',
    enum: CrawlerStatusEnum,
    nullable: true,
  })
  status?: CrawlerStatusEnum;

  @Column({ type: 'text', nullable: true })
  message?: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'varchar', length: 2083, nullable: true })
  links?: string;

  @Column({ type: 'varchar', length: 2083, nullable: true })
  linkDownloaded?: string;

  @Column({ type: 'json', nullable: true })
  meta?: string;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt?: Date;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Column({ type: 'bigint', nullable: true })
  crawlerLinkId?: number;

  @ManyToOne(() => CrawlerLink, (s) => s.crawler, { nullable: true })
  crawlerLinks?: CrawlerLink[];

  @Column({ type: 'bigint', nullable: true })
  userId?: number;

  @OneToMany(() => User, (s) => s.crawlers, { nullable: true })
  user?: User;
}
