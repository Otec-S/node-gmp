import { MikroORM, EntityRepository } from '@mikro-orm/core';
import { User } from './entities/user.entity.js';
import mikroOrmConfig from '../mikro-orm.config.js';

// shared container — populated once at startup, imported wherever needed
export const DI = {} as {
  orm: MikroORM;
  users: EntityRepository<User>;  // add one entry per entity
};

export const connect = async () => {
  try {
    DI.orm = await MikroORM.init(mikroOrmConfig);
    DI.users = DI.orm.em.getRepository(User);
    console.log('PostgreSQL connected successfully');
  } catch (error) {
    console.error('PostgreSQL connection error:', error);
    process.exit(1);  // connection failure is unrecoverable — stop the process
  }
};

export const disconnect = async () => {
  await DI.orm.close(true);  // true flushes any pending changes before closing
};
