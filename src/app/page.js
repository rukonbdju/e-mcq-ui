'use client'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

function Home() {
  return (
    <main>
      <div className="container mx-auto relative overflow-hidden max-w-screen min-h-screen">
        <div
          className="absolute inset-1 animate-spin-slow z-0 w-full h-full"
          style={{
            background: 'conic-gradient(from 0deg, #2B6CB0, transparent, #38A169, transparent, #2B6CB0)',
          }}
        ></div>
        <div className="relative z-10 flex flex-col items-center justify-center gap-8 text-center px-6 py-12 shadow-xl bg-white/60 backdrop-blur-sm transition-opacity duration-700 animate-fade-in-up max-w-screen min-h-screen">

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight">
            E-MCQ – Smart Online Exams for Everyone
          </h1>
          <p className="mt-2 text-base sm:text-lg lg:text-xl text-gray-600 font-medium">
            Take and create MCQ exams anytime, anywhere. For students and teachers.
          </p>
          <div className="mt-4 flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
            <Link href={'/login'} className="px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-xl shadow-lg hover:bg-blue-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2B6CB0]">
              Login
            </Link>
            <Link href={'/register'} className="px-6 py-3 text-lg font-semibold text-white bg-green-700 rounded-xl shadow-lg hover:bg-green-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#38A169]">
              Register
            </Link>
            <button className="px-6 py-3 text-lg font-semibold text-gray-700 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400">
              Guest Access
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function RootPage() {
  const router = useRouter();
  const [auth, setAuth] = useState({ role: null, loading: true });

  useEffect(() => {
    const timer = setTimeout(() => {
      setAuth({ role: '', loading: false }); // '' = not logged in
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!auth.loading && auth.role) {
      router.push(`/${auth.role}`);
    }
  }, [auth, router]);

  if (auth.loading) return <div className="flex h-screen w-full flex-col items-center justify-center bg-blue-50">
    <div className="relative">
      <div className="absolute h-16 w-16 rounded-full border-4 border-gray-700 animate-ping"></div>
    </div>
  </div>;
  if (!auth.role) return <Home />;
  return null;
}
