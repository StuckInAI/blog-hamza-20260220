import Link from 'next/link';
import { Post } from '@/entities/Post';

type PostListProps = {
  posts: Post[];
};

export default function PostList({ posts }: PostListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <div key={post.id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-bold text-green-700">
            <Link href={`/posts/${post.id}`}>{post.title}</Link>
          </h2>
          <p className="text-gray-600 mt-2">{post.excerpt}</p>
          <div className="mt-4 text-sm text-gray-500">
            <span>By {post.author}</span>
            <span className="mx-2">•</span>
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          </div>
          <Link 
            href={`/posts/${post.id}`} 
            className="inline-block mt-4 text-green-600 hover:text-green-800 font-medium"
          >
            Read More →
          </Link>
        </div>
      ))}
    </div>
  );
}
