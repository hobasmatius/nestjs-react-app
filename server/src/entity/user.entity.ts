import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn({
    type: 'bigint'
  })
  id: number;

  @Index({unique: true})
  @Column({
    nullable: false,
    default: ''
  })
  email: string;

  @Column({
    nullable: true
  })
  name: string;

  @Column({
    nullable: false,
    default: ''
  })
  password: string;

  @Column({
    nullable: false,
    default: false,
    name: 'is_email_verified'
  })
  isEmailVerified: boolean;

  @Column({
    nullable: false,
    default: () => "CURRENT_TIMESTAMP",
    name: 'sign_up_at'
  })
  signUpAt: Date;

  @Column({
    nullable: false,
    default: 0,
    name: 'login_count'
  })
  loginCount: number;

  @Column({
    nullable: false,
    default: () => "CURRENT_TIMESTAMP",
    name: 'last_session_at'
  })
  lastSessionAt: Date;
}