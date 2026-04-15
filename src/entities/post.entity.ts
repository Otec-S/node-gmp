import { randomUUID } from 'node:crypto';
import { Collection, Entity, ManyToMany, ManyToOne, Opt, PrimaryKey, Property } from '@mikro-orm/core';
import { User } from './user.entity.js';
import { Tag } from './tag.entity.js';

@Entity({ tableName: 'posts' })
export class Post {
  @PrimaryKey({ type: 'uuid' })
  id: string = randomUUID();

  @Property({ type: 'string' })
  title!: string;

  @Property({ type: 'string', columnType: 'text' })
  body!: string;

  @Property({ type: 'boolean', default: false })
  published: boolean & Opt = false;

  @ManyToOne(() => User) // owns the FK — author_id lives on this table
  author!: User;

  @ManyToMany(() => Tag, tag => tag.posts, { owner: true }) // owns the join table — post_tags
  tags = new Collection<Tag>(this);
}
