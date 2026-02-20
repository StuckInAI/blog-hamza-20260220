import { Post } from '@/entities/Post';

type PostDetailProps = {
  post: Post;
};

export default function PostDetail({ post }: PostDetailProps) {
  return (
    <article className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-green-800 mb-4">{post.title}</h1>
      <div className="text-gray-600 mb-6">
        <span>By {post.author}</span>
        <span className="mx-2">•</span>
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
      </div>
      <div className="prose max-w-none">
        <p className="text-lg">{post.content}</p>
      </div>
    </article>
  );
}
