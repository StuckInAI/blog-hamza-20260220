import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Post } from '@/entities/Post';
import Link from 'next/link';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    } else if (status === 'authenticated') {
      fetchPosts();
    }
  }, [status, router]);

  const fetchPosts = async () => {
    const res = await fetch('/api/posts');
    const data = await res.json();
    setPosts(data);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this post?')) {
      await fetch(`/api/posts/${id}`, { method: 'DELETE' });
      fetchPosts();
    }
  };

  if (status === 'loading') {
    return <div className="text-center p-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Head>
        <title>Admin Dashboard | Health & Fitness Blog</title>
      </Head>
      <Header />
      <main className="flex-grow container mx-auto p-4 mt-8">
        <h1 className="text-3xl font-bold text-green-900 mb-6">Admin Dashboard</h1>
        <div className="mb-6">
          <Link 
            href="/admin/posts/create" 
            className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800"
          >
            Create New Post
          </Link>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">All Posts</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Title</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Author</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Date</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 text-sm text-gray-900">{post.title}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">{post.author}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 text-sm">
                      <Link 
                        href={`/admin/posts/edit/${post.id}`} 
                        className="text-blue-600 hover:text-blue-800 mr-4"
                      >
                        Edit
                      </Link>
                      <button 
                        onClick={() => handleDelete(post.id)} 
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
