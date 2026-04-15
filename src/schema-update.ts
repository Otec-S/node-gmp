import 'reflect-metadata';
import 'dotenv/config';
import { MikroORM } from '@mikro-orm/core';
import mikroOrmConfig from '../mikro-orm.config.js';

const updateSchema = async () => {
  const orm = await MikroORM.init(mikroOrmConfig);
  try {
    const generator = orm.getSchemaGenerator();
    await generator.refreshDatabase();
    console.log('Schema updated successfully');
  } finally {
    await orm.close(true);
  }
};

updateSchema();
