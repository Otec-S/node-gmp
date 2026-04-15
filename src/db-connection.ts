import { MikroORM, EntityManager, EntityRepository } from '@mikro-orm/core';
import { User } from './entities/user.entity.js';
import { Profile } from './entities/profile.entity.js';
import { Post } from './entities/post.entity.js';
import { Tag } from './entities/tag.entity.js';
import mikroOrmConfig from '../mikro-orm.config.js';

// shared container — populated once at startup, imported wherever needed
export const DI = {} as {
  orm: MikroORM;
  em: EntityManager;
  users: EntityRepository<User>;
  profiles: EntityRepository<Profile>;
  posts: EntityRepository<Post>;
  tags: EntityRepository<Tag>;
};

export const connect = async () => {
  try {
    DI.orm = await MikroORM.init(mikroOrmConfig);
    DI.em = DI.orm.em;
    DI.users = DI.orm.em.getRepository(User);
    DI.profiles = DI.orm.em.getRepository(Profile);
    DI.posts = DI.orm.em.getRepository(Post);
    DI.tags = DI.orm.em.getRepository(Tag);

    const migrator = DI.orm.getMigrator();
    await migrator.up();  // run any pending migrations before accepting requests

    console.log('PostgreSQL connected successfully');
  } catch (error) {
    console.error('PostgreSQL connection error:', error);
    process.exit(1);  // connection failure is unrecoverable — stop the process
  }
};

export const disconnect = async () => {
  await DI.orm.close(true);  // true flushes any pending changes before closing
};
