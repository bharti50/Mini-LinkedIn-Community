import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-pink-50 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-4 text-black">Welcome to Mini LinkedIn</h1>
        <p className="text-red-600 mb-6">
          Connect with professionals and grow your network.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/auth/login"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Login
          </Link>
          <Link
            href="/auth/register"
            className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg"
          >
            Register
          </Link>
        </div>
      </div>
    </main>
  );
}