import { UniqueConstraintViolationException } from '@mikro-orm/core';
import { User } from '../entities/user.entity.js';
import { DI } from '../db-connection.js';

export const createUser = async (data: Omit<User, 'id'>) => {
  const em = DI.orm.em.fork();
  const userRepository = em.getRepository(User);
  const user = userRepository.create(data);  // id is generated automatically by the entity default
  try {
    await em.persistAndFlush(user);
  } catch (error) {
    if (error instanceof UniqueConstraintViolationException) {
      throw new Error(`User with this email already exists`);
    }
    throw error;
  }
  return user;
};

export const getUsers = async () => {
  const em = DI.orm.em.fork();
  return em.getRepository(User).findAll();
};

export const getUserById = async (id: string) => {
  const em = DI.orm.em.fork();
  return em.getRepository(User).findOne(id);
};

export const updateUser = async (id: string, data: Partial<Omit<User, 'id'>>) => {
  const em = DI.orm.em.fork();
  const user = await em.getRepository(User).findOne({ id });
  if (!user) return null;

  Object.assign(user, data);
  await em.persistAndFlush(user);
  return user;
};

export const deleteUser = async (id: string) => {
  const em = DI.orm.em.fork();
  const user = await em.getRepository(User).findOne({ id });
  if (!user) return false;

  await em.removeAndFlush(user);
  return true;
};