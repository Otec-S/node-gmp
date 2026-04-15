import { randomUUID } from 'node:crypto';
import { Collection, Entity, ManyToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { Post } from './post.entity.js';

@Entity({ tableName: 'tags' })
export class Tag {
  @PrimaryKey({ type: 'uuid' })
  id: string = randomUUID();

  @Property({ type: 'string', unique: true })
  name!: string;

  @ManyToMany(() => Post, post => post.tags) // inverse side
  posts = new Collection<Post>(this);
}
