import { NextApiRequest, NextApiResponse } from 'next';
import { getDatabaseConnection } from '@/lib/database';
import { Post } from '@/entities/Post';

async function handleGet(res: NextApiResponse) {
  const connection = await getDatabaseConnection();
  const postRepository = connection.getRepository(Post);
  const posts = await postRepository.find({ order: { createdAt: 'DESC' } });
  res.status(200).json(posts);
}

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  const { title, excerpt, content, author } = req.body;
  if (!title || !excerpt || !content || !author) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const connection = await getDatabaseConnection();
  const postRepository = connection.getRepository(Post);
  const post = new Post();
  post.title = title;
  post.excerpt = excerpt;
  post.content = content;
  post.author = author;
  post.createdAt = new Date();
  await postRepository.save(post);
  res.status(201).json(post);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      await handleGet(res);
      break;
    case 'POST':
      await handlePost(req, res);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
