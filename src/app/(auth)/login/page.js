'use client'

import { apiFetcher } from "@/utils/fetcher";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

const LoginPage = () => {
    const router = useRouter()
    const [error, setError] = useState(null)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const result = await apiFetcher('/auth/login', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })
            console.log(result)
            if (result.success) {
                const route = "/" + result.data.role.toLowerCase()
                router.push(route)
            }
        } catch (error) {
            console.log(error)
            setError(error.message)
        }
    };

    useEffect(() => {
        const getMe = async () => {
            const res = await apiFetcher('/auth/me')
            console.log(res)
        }
        getMe()
    }, [])

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
                    <div className="container mx-auto relative overflow-hidden rounded-3xl max-w-2xl bg-white/50 outline-2 outline-green-600">
                        <div className="relative z-10 flex flex-col items-center gap-6 text-center px-6 py-12 rounded-3xl shadow-xl duration-700 animate-fade-in-up">

                            {/* Login Form Header */}
                            <h2 className="text-3xl font-bold text-gray-900">
                                Login to E-MCQ
                            </h2>
                            <p className="text-gray-500">
                                Enter your credentials to access your account.
                            </p>

                            {/* Login Form */}
                            <form onSubmit={handleLogin} className="space-y-6 w-full">
                                {error && <div className="bg-red-50 border border-red-500 text-red-500 text-sm p-3 rounded-xl text-left">
                                    <p>{error}</p>
                                </div>}
                                <div>
                                    <label htmlFor="email" className="sr-only">Email address</label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Email address"
                                        className="w-full px-4 py-3 border bg-white border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="password" className="sr-only">Password</label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Password"
                                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                                    />
                                </div>

                                {/* Forgot Password Link */}
                                <div className="text-right text-sm">
                                    <a href="#" className="font-medium text-[#2B6CB0] hover:text-blue-700">
                                        Forgot your password?
                                    </a>
                                </div>

                                {/* Login Button */}
                                <div>
                                    <button
                                        type="submit"
                                        className="w-full px-4 py-3 text-lg font-semibold text-white bg-[#2B6CB0] rounded-xl shadow-lg hover:bg-[#226fc2] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2B6CB0]"
                                    >
                                        Log in
                                    </button>
                                </div>
                            </form>

                            {/* Registration Link */}
                            <div className="text-sm text-gray-600">
                                {`Don't have an account?`}{' '}
                                <a href="/register" className="font-medium text-[#38A169] hover:text-green-700">
                                    Register now
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
export default LoginPage;