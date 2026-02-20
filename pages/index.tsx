import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PostList from '@/components/PostList';
import { getDatabaseConnection } from '@/lib/database';
import { Post } from '@/entities/Post';

type HomeProps = {
  posts: Post[];
};

export default function Home({ posts }: HomeProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Head>
        <title>Health & Fitness Blog</title>
        <meta name="description" content="A blog dedicated to health, fitness, and wellness tips." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="flex-grow container mx-auto p-4 mt-8">
        <h1 className="text-4xl font-bold text-center text-green-900 mb-8">Latest Fitness Insights</h1>
        <PostList posts={posts} />
      </main>
      <Footer />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const connection = await getDatabaseConnection();
  const postRepository = connection.getRepository(Post);
  const posts = await postRepository.find({ order: { createdAt: 'DESC' } });
  return { props: { posts: JSON.parse(JSON.stringify(posts)) } };
};
