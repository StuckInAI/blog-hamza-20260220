import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function EditPost() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { id } = router.query;
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    if (id && status === 'authenticated') {
      fetchPost();
    } else if (status === 'unauthenticated') {
      router.push('/admin/login');
    }
  }, [id, status, router]);

  const fetchPost = async () => {
    const res = await fetch(`/api/posts/${id}`);
    const post = await res.json();
    setTitle(post.title);
    setExcerpt(post.excerpt);
    setContent(post.content);
    setAuthor(post.author);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, excerpt, content, author }),
    });
    if (res.ok) {
      router.push('/admin/dashboard');
    }
  };

  if (status === 'loading') return <div>Loading...</div>;
  if (!id || status === 'unauthenticated') return null;

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Head>
        <title>Edit Post | Health & Fitness Blog</title>
      </Head>
      <Header />
      <main className="flex-grow container mx-auto p-4 mt-8">
        <h1 className="text-3xl font-bold text-green-900 mb-6">Edit Post</h1>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="excerpt">
              Excerpt
            </label>
            <textarea
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              rows={2}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              rows={10}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="author">
              Author
            </label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-green-700 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-600"
          >
            Update Post
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
}
