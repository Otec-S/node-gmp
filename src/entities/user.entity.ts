import { randomUUID } from 'node:crypto';
import { Collection, Entity, OneToMany, OneToOne, Opt, PrimaryKey, Property } from '@mikro-orm/core';
import { Profile } from './profile.entity.js';
import { Post } from './post.entity.js';

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

  @OneToOne(() => Profile, profile => profile.user, { owner: true, nullable: true })
  profile?: Profile;

  @OneToMany(() => Post, post => post.author)
  posts = new Collection<Post>(this);
}
