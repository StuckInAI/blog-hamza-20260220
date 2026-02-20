import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PostDetail from '@/components/PostDetail';
import { getDatabaseConnection } from '@/lib/database';
import { Post } from '@/entities/Post';

type PostPageProps = {
  post: Post | null;
};

export default function PostPage({ post }: PostPageProps) {
  if (!post) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-100">
        <Header />
        <main className="flex-grow container mx-auto p-4 text-center">
          <h1 className="text-2xl font-bold text-red-600">Post not found</h1>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Head>
        <title>{post.title} | Health & Fitness Blog</title>
        <meta name="description" content={post.excerpt} />
      </Head>
      <Header />
      <main className="flex-grow container mx-auto p-4 mt-8">
        <PostDetail post={post} />
      </main>
      <Footer />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id as string;
  const connection = await getDatabaseConnection();
  const postRepository = connection.getRepository(Post);
  const post = await postRepository.findOne({ where: { id: parseInt(id) } });
  return { props: { post: post ? JSON.parse(JSON.stringify(post)) : null } };
};
