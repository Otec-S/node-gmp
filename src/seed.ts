import 'reflect-metadata';
import 'dotenv/config';
import { connect, disconnect, DI } from './db-connection.js';
import { User } from './entities/user.entity.js';

const users = [
  { name: 'Alice', email: 'alice@example.com' },
  { name: 'Bob', email: 'bob@example.com' },
];

const seed = async () => {
  try {
    await connect();

    const em = DI.orm.em.fork();
    const userRepository = em.getRepository(User);

    for (const data of users) {
      const user = userRepository.create(data);
      await em.persistAndFlush(user);
    }
  } finally {
    await disconnect();
  }
};

seed();
