import 'reflect-metadata';
import 'dotenv/config';
import { connect, disconnect, DI } from './db-connection.js';
import { User } from './entities/user.entity.js';
import { Profile } from './entities/profile.entity.js';
import { Post } from './entities/post.entity.js';
import { Tag } from './entities/tag.entity.js';

const seed = async () => {
  try {
    await connect();
    const em = DI.orm.em.fork();

    // clear existing data (order matters — respect FK constraints)
    await em.nativeDelete('posts_tags', {});
    await em.nativeDelete(Post, {});
    await em.nativeDelete(User, {});
    await em.nativeDelete(Profile, {});
    await em.nativeDelete(Tag, {});

    // create tags first — posts will reference them
    const tagNode = em.create(Tag, { name: 'node.js' });
    const tagTs = em.create(Tag, { name: 'typescript' });

    // create a user with a profile
    const profile = em.create(Profile, { bio: 'Writes about backend development' });
    const user = em.create(User, {
      name: 'Alice',
      email: 'alice@example.com',
      profile,
    });

    // create a post authored by Alice and tag it
    const post = em.create(Post, {
      title: 'Getting started with MikroORM',
      body: 'MikroORM is a TypeScript ORM...',
      author: user,
      tags: [tagNode, tagTs],
    });

    await em.persistAndFlush([tagNode, tagTs, profile, user, post]);
  } finally {
    await disconnect();
  }
};

seed();
