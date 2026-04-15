import { Post } from '../entities/post.entity.js';
import { User } from '../entities/user.entity.js';
import { Tag } from '../entities/tag.entity.js';
import { DI } from '../db-connection.js';

export const createPost = async (userId: string, data: Pick<Post, 'title' | 'body'>) => {
  const em = DI.orm.em.fork();

  const user = await em.findOne(User, { id: userId });
  if (!user) return null;

  const post = em.create(Post, { ...data, author: user });
  await em.persistAndFlush(post);
  return post;
};

export const addTag = async (postId: string, tagName: string) => {
  const em = DI.orm.em.fork();

  const post = await em.findOne(Post, { id: postId }, { populate: ['tags'] });
  if (!post) return null;

  const tag = await em.findOne(Tag, { name: tagName });
  if (!tag) return null;

  post.tags.add(tag); // inserts a row into post_tags on flush
  await em.flush();
  return post;
};

export const removeTag = async (postId: string, tagName: string) => {
  const em = DI.orm.em.fork();

  const post = await em.findOne(Post, { id: postId }, { populate: ['tags'] });
  if (!post) return null;

  const tag = await em.findOne(Tag, { name: tagName });
  if (!tag) return null;

  post.tags.remove(tag); // deletes the join row on flush
  await em.flush();
  return post;
};
