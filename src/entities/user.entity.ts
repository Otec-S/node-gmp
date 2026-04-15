import { randomUUID } from 'node:crypto';
import { Entity, Opt, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'users' })
export class User {
  @PrimaryKey({ type: 'uuid' })
  id: string = randomUUID();

  @Property()
  name!: string;

  @Property({ unique: true })
  email!: string;

  @Property({ nullable: true })
  age?: number;

  @Property({ default: 'user' })
  role: string & Opt = 'user';
}
