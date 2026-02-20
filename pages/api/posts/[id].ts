import { NextApiRequest, NextApiResponse } from 'next';
import { getDatabaseConnection } from '@/lib/database';
import { Post } from '@/entities/Post';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const connection = await getDatabaseConnection();
  const postRepository = connection.getRepository(Post);
  const postId = parseInt(id as string);

  if (isNaN(postId)) {
    return res.status(400).json({ error: 'Invalid post ID' });
  }

  switch (req.method) {
    case 'GET':
      const post = await postRepository.findOne({ where: { id: postId } });
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ error: 'Post not found' });
      }
      break;
    case 'PUT':
      const { title, excerpt, content, author } = req.body;
      const existingPost = await postRepository.findOne({ where: { id: postId } });
      if (!existingPost) {
        return res.status(404).json({ error: 'Post not found' });
      }
      existingPost.title = title || existingPost.title;
      existingPost.excerpt = excerpt || existingPost.excerpt;
      existingPost.content = content || existingPost.content;
      existingPost.author = author || existingPost.author;
      await postRepository.save(existingPost);
      res.status(200).json(existingPost);
      break;
    case 'DELETE':
      const postToDelete = await postRepository.findOne({ where: { id: postId } });
      if (!postToDelete) {
        return res.status(404).json({ error: 'Post not found' });
      }
      await postRepository.remove(postToDelete);
      res.status(204).end();
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
