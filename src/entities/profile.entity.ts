import { randomUUID } from 'node:crypto';
import { Entity, OneToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { User } from './user.entity.js';

@Entity({ tableName: 'profiles' })
export class Profile {
  @PrimaryKey({ type: 'uuid' })
  id: string = randomUUID();

  @Property({ type: 'string', nullable: true })
  bio?: string;

  @Property({ type: 'string', nullable: true })
  avatarUrl?: string;

  @OneToOne(() => User, user => user.profile) // inverse side — no FK column here
  user?: User;
}
