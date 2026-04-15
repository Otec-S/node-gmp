import { Options } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { User } from './src/entities/user.entity.js';
import { Profile } from './src/entities/profile.entity.js';
import { Post } from './src/entities/post.entity.js';
import { Tag } from './src/entities/tag.entity.js';

const mikroOrmConfig: Options<PostgreSqlDriver> = {
  driver: PostgreSqlDriver,
  entities: [User, Profile, Post, Tag],
  dbName: process.env.DB_NAME,
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT ?? 5432),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  pool: { min: 2, max: 10 },
  debug: true,
  migrations: {
    path: './src/migrations',     // where migration files live
    tableName: 'migrations',      // database table that tracks which migrations ran
    transactional: true,          // wrap each migration in its own transaction
  },
};

export default mikroOrmConfig;
