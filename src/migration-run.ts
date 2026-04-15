import 'reflect-metadata';
import 'dotenv/config';
import { MikroORM } from '@mikro-orm/core';
import mikroOrmConfig from '../mikro-orm.config.js';

const runMigrations = async () => {
  const orm = await MikroORM.init(mikroOrmConfig);
  try {
    const migrator = orm.getMigrator();
    await migrator.up();
    console.log('Migrations applied successfully');
  } finally {
    await orm.close(true);
  }
};

runMigrations();
