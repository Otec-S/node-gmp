import { randomUUID } from 'node:crypto';
import { Entity, Opt, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'users' })
export class User {
  @PrimaryKey({ type: 'uuid' })
  id: string = randomUUID();

  @Property({ type: 'string' })
  name!: string;

  @Property({ type: 'string', unique: true })
  email!: string;

  @Property({ type: 'number', nullable: true })
  age?: number;

  @Property({ type: 'string', default: 'user' })
  role: string & Opt = 'user';
}
