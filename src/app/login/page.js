'use client'

import API from "@/utils/api-url";
import { apiFetcher } from "@/utils/fetcher";
import { useState } from "react";

const LoginPage = () => {
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
        } catch (error) {
            console.log(error)
        }
    };

    return (

        <div className="container mx-auto relative overflow-hidden rounded-3xl max-w-2xl">
            <div
                className="absolute inset-1 rounded-3xl animate-spin-slow z-0"
                style={{
                    background: 'conic-gradient(from 0deg, #2B6CB0, transparent, #38A169, transparent, #2B6CB0)',
                }}
            ></div>
            <div className="relative z-10 flex flex-col items-center gap-6 text-center px-6 py-12 rounded-3xl shadow-xl bg-white/60 backdrop-blur-sm transition-opacity duration-700 animate-fade-in-up">

                {/* Login Form Header */}
                <h2 className="text-3xl font-bold text-gray-900">
                    Login to E-MCQ
                </h2>
                <p className="text-gray-500">
                    Enter your credentials to access your account.
                </p>

                {/* Login Form */}
                <form onSubmit={handleLogin} className="space-y-6 w-full">
                    {/* Email Input Field */}
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

                    {/* Password Input Field */}
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
                            className="w-full px-4 py-3 text-lg font-semibold text-white bg-[#2B6CB0] rounded-xl shadow-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2B6CB0]"
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
    );
}
export default LoginPage;