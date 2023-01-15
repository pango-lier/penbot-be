
import { Article } from '@articles/entities/article.entity';
import { CrawlerLink } from '@crawlers/crawler-links/entities/crawler-link.entity';
import { Account } from '@users/accounts/entities/account.entity';
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
import { SocialEnum } from './social.enum';

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

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt?: Date;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => Account, (account) => account.socials, {
    nullable: true,
  })
  account?: Account;

  @OneToMany(() => Article, (article) => article.social, {
    nullable: true,
  })
  articles?: Article[];

  @ManyToOne(() => CrawlerLink, (s) => s.social, { nullable: true })
  crawlerLinks?: CrawlerLink[];
}
