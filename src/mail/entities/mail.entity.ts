import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { EnumMailStatus, EnumMailType } from '../type/mail.enum';
import { MailMetaDto } from '../type/mail-meta.dto';
import { User } from 'src/users/entities/user.entity';
import { IsEmail } from 'class-validator';

@Entity()
export class Mail extends CoreEntity {
  @Column({ type: 'enum', default: EnumMailType.Question, enum: EnumMailType })
  type?: EnumMailType;

  @Column({ type: 'tinytext', nullable: true })
  description?: string;

  @Column({ type: 'json', nullable: true })
  meta?: MailMetaDto;

  @IsEmail()
  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  subject: string;

  @Column({ type: 'enum', default: EnumMailStatus.Draft, enum: EnumMailStatus })
  status?: EnumMailStatus;

  @Column({ type: 'bigint', nullable: true })
  userId?: number;

  @ManyToOne(() => User, (e) => e.mails)
  @JoinColumn({ name: 'userId' })
  user?: User;
}
