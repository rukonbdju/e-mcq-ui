'use client'

import API from "@/utils/api-url";
import { apiFetcher } from "@/utils/fetcher";
import Link from "next/link";
import { useState } from "react";

const LoginPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'Student'
    })
    const [errors, setErrors] = useState({});

    const handleRegister = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setErrors({ confirmPassword: "Passwords do not match." });
            return;
        }
        try {
            const result = await apiFetcher("/auth/register", {
                method: 'POST',
                body: formData
            })
            console.log(result)

        } catch (error) {
            console.log(error)
        }
        console.log('Registration attempt with:', formData);
    };

    const onInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    return (

        <div className="container mx-auto relative overflow-hidden rounded-3xl max-w-2xl">
            <div
                className="absolute inset-1 rounded-3xl animate-spin-slow z-0"
                style={{
                    background: 'conic-gradient(from 0deg, #2B6CB0, transparent, #38A169, transparent, #2B6CB0)',
                }}
            ></div>
            <div className="relative z-10 flex flex-col items-center gap-6 text-center px-6 py-12 rounded-3xl shadow-xl bg-white/60 backdrop-blur-sm transition-opacity duration-700 animate-fade-in-up">

                <h2 className="text-3xl font-bold text-gray-900">
                    Register for E-MCQ
                </h2>
                <p className="text-gray-500">
                    Join us and create your account.
                </p>

                <form onSubmit={handleRegister} className="space-y-6 w-full">
                    <div>
                        <label htmlFor="name" className="sr-only">Full Name</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            autoComplete="name"
                            required
                            value={formData.name}
                            onChange={onInputChange}
                            placeholder="Full Name"
                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="sr-only">Email address</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={formData.email}
                            onChange={onInputChange}
                            placeholder="Email address"
                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                        />
                    </div>
                    <div>
                        <label htmlFor="role" className="sr-only">Role</label>
                        <select
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={onInputChange}
                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                        >
                            <option value="Student">Student</option>
                            <option value="Teacher">Teacher</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="password" className="sr-only">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="new-password"
                            required
                            value={formData.password}
                            onChange={onInputChange}
                            placeholder="Password"
                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            autoComplete="new-confirmPassword"
                            required
                            value={formData.confirmPassword}
                            onChange={onInputChange}
                            placeholder="Confirm password"
                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                        />
                        {errors.confirmPassword && (
                            <p className="mt-2 text-sm text-red-600 text-left">
                                {errors.confirmPassword}
                            </p>
                        )}
                    </div>

                    {/* Register Button */}
                    <div>
                        <button
                            type="submit"
                            className="w-full px-4 py-3 text-lg font-semibold text-white bg-[#2B6CB0] rounded-xl shadow-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2B6CB0]"
                        >
                            Register
                        </button>
                    </div>
                </form>

                <div className="text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link href="/login" className="font-medium text-[#2B6CB0] hover:text-blue-700">
                        Log in
                    </Link>
                </div>
            </div>
        </div>
    );
}
export default LoginPage;