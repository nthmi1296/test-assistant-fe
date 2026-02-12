import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../lib/api';
import { useAuthStore } from '../state/auth';


export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const login = useAuthStore((s) => s.login);
    
    const navigate = useNavigate();

    async function onSubmit(e: React.FormEvent) {
            e.preventDefault();
            setError(null);
            setLoading(true);
            try {
                const res = await api.post('/auth/login', {
                    email,
                    password,
                });
                login(res.data.data);
                navigate('/');
            } catch (err: any) {
                setError(err.response?.data?.error || 'Login failed. Please try again.');
            } finally {
                setLoading(false);
            }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center px-4 py-12">
            <div>
                <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8 space-y-6">
                    <div className="text-center space-y-2">
                        <h1 className="text-2xl font-semibold">Welcome Back~</h1>
                        <p>Sign in to your account to continue!</p>
                    </div>
                    <div>
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm" role="alert">
                                <strong className="font-bold">Error: </strong>
                                <span className="block sm:inline">{error}</span>
                            </div>
                        )}
                    </div>
                    <form onSubmit={onSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                            <input 
                                type="email"   
                                id="email"
                                placeholder="Enter your email" 
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all" />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                            <input 
                                type="password"
                                id="password"
                                placeholder="Enter your password"
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"/>
                        </div>
                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all shadow-lg hover:shadow-xl"
                            >{loading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>
                    <div>
                        <p className="text-sm text-gray-600 text-center">
                            Don't have an account?{' '}
                            <a href="/register" className="text-indigo-600 hover:underline">
                                Register
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
