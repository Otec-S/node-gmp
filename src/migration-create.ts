import 'reflect-metadata';
import 'dotenv/config';
import { MikroORM } from '@mikro-orm/core';
import mikroOrmConfig from '../mikro-orm.config.js';

const createMigration = async () => {
  const orm = await MikroORM.init(mikroOrmConfig);
  try {
    const migrator = orm.getMigrator();
    const migration = await migrator.createMigration();
    console.log(`Migration created: ${migration.fileName}`);
  } finally {
    await orm.close(true);
  }
};

createMigration();
