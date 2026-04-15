import { Options } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { User } from './src/entities/user.entity.js';

const mikroOrmConfig: Options<PostgreSqlDriver> = {
  driver: PostgreSqlDriver,
  entities: [User],
  dbName: process.env.DB_NAME,
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT ?? 5432),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  pool: { min: 2, max: 10 },
  migrations: { path: './src/migrations' },
  debug: true
};

export default mikroOrmConfig;
