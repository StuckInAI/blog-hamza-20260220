import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="bg-green-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <Link href="/">Health & Fitness Blog</Link>
        </h1>
        <nav>
          <ul className="flex space-x-4">
            <li><Link href="/" className="hover:underline">Home</Link></li>
            {session ? (
              <>
                <li><Link href="/admin/dashboard" className="hover:underline">Dashboard</Link></li>
                <li>
                  <button onClick={() => signOut()} className="hover:underline">
                    Sign Out
                  </button>
                </li>
              </>
            ) : (
              <li><Link href="/admin/login" className="hover:underline">Admin Login</Link></li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
