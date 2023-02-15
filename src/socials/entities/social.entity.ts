import { Article } from '@articles/entities/article.entity';
import { CrawlerLink } from '@crawlers/crawler-links/entities/crawler-link.entity';
import { Proxy } from '@users/proxies/entities/proxy.entity';
import { User } from '@users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SocialEnum } from './social.enum';
import { Crawler } from '@crawlers/entities/crawler.entity';
import { SocialTarget } from '@social-targets/entities/social-target.entity';

@Entity()
export class Social {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', nullable: true })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  username: string;

  @Column({ type: 'varchar', nullable: true })
  password: string;

  @Column({ type: 'enum', enum: SocialEnum, default: SocialEnum.NONE })
  socialType: SocialEnum;

  @Column({ type: 'boolean', default: true })
  active?: boolean;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt?: Date;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => Proxy, (proxy) => proxy.socials, {
    nullable: true,
  })
  proxy?: Proxy;

  @Column({ type: 'bigint', nullable: true })
  userId: number;

  @ManyToOne(() => User, (u) => u.socials, {
    nullable: true,
  })
  user?: User;

  @OneToMany(() => SocialTarget, (u) => u.social, {
    nullable: true,
  })
  socialTarget?: Article[];

  @ManyToMany(() => Crawler, (s) => s.socials, {
    nullable: true,
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinTable()
  crawlers?: Crawler[];
}
