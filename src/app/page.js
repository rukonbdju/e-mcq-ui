import API from "@/utils/api-url";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function Home() {
  const cookieStore = cookies();
  const res = await fetch(API + '/auth/me', { headers: { Cookie: cookieStore.toString() }, credentials: 'include' })
  const result = await res.json()
  console.log(result)
  return (
    <div className="container mx-auto relative overflow-hidden rounded-3xl max-w-2xl">
      <div
        className="absolute inset-1 rounded-3xl animate-spin-slow z-0"
        style={{
          background: 'conic-gradient(from 0deg, #2B6CB0, transparent, #38A169, transparent, #2B6CB0)',
        }}
      ></div>
      <div className="relative z-10 flex flex-col items-center gap-8 text-center px-6 py-12 rounded-3xl shadow-xl bg-white/60 backdrop-blur-sm transition-opacity duration-700 animate-fade-in-up">

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
  );
}
