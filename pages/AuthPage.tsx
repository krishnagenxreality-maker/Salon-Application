
import React, { useState } from 'react';
import { UserRole } from '../types';
import { api } from '../services/api';

interface AuthPageProps {
    onLoginSuccess: (userId: string, role: UserRole) => void;
    onNavigateToCreateId: (role: UserRole) => void;
    onNavigateToForgotPassword: (role: UserRole) => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ 
    onLoginSuccess, 
    onNavigateToCreateId, 
    onNavigateToForgotPassword 
}) => {
    const [role, setRole] = useState<'candidate' | 'admin'>('candidate');
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const data = await api.login(userId.trim(), password.trim(), role);
            if (data.success) {
                onLoginSuccess(data.user.id, role);
            } else {
                setError(data.message || 'Invalid credentials');
            }
        } catch (err) {
            setError('Connection failed. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    const toggleRole = (newRole: 'candidate' | 'admin') => {
        if (role === newRole) return;
        setRole(newRole);
        setError('');
        setUserId('');
        setPassword('');
    };

    return (
        <div className="w-full min-h-screen flex flex-col md:flex-row bg-white dark:bg-gray-900 transition-colors duration-500">
            
            {/* Left Branding Panel: TONI&GUY GLOW */}
            <div className="md:w-1/2 bg-black flex flex-col items-center justify-center p-12 text-center relative overflow-hidden min-h-[45vh] md:min-h-screen">
                <div className="relative z-10 animate-fade-in">
                    <h1 className="text-5xl sm:text-7xl md:text-9xl font-black text-white tracking-tighter leading-[0.85] drop-shadow-[0_0_35px_rgba(255,255,255,0.6)] select-none">
                        TONI<br/>&GUY
                    </h1>
                    <div className="mt-8 flex flex-col items-center">
                        <div className="w-12 h-[2px] bg-white/30 mb-6"></div>
                        <p className="text-gray-400 text-xs sm:text-sm font-medium tracking-[0.3em] uppercase animate-pulse">
                            Academy Portal
                        </p>
                    </div>
                </div>
                
                {/* Subtle Ambient Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle,rgba(255,255,255,0.08)_0%,transparent_70%)] pointer-events-none"></div>
            </div>

            {/* Right Auth Panel: Interaction */}
            <div className="md:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-24 bg-white dark:bg-gray-900 transition-colors duration-500">
                <div className="max-w-md w-full animate-slide-up">
                    
                    {/* Role Switcher Bar */}
                    <div className="mb-12">
                        <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 tracking-widest uppercase mb-4 block text-center">
                            Select Your Role
                        </label>
                        <div className="bg-gray-100 dark:bg-gray-800 p-1.5 rounded-2xl flex items-center shadow-inner border border-gray-200/50 dark:border-gray-700/50">
                            <button
                                onClick={() => toggleRole('candidate')}
                                className={`flex-1 py-3.5 px-6 rounded-xl text-sm font-bold transition-all duration-300 transform ${
                                    role === 'candidate' 
                                        ? 'bg-black text-white dark:bg-white dark:text-black shadow-xl scale-100' 
                                        : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-gray-200 scale-95'
                                }`}
                            >
                                Candidate
                            </button>
                            <button
                                onClick={() => toggleRole('admin')}
                                className={`flex-1 py-3.5 px-6 rounded-xl text-sm font-bold transition-all duration-300 transform ${
                                    role === 'admin' 
                                        ? 'bg-black text-white dark:bg-white dark:text-black shadow-xl scale-100' 
                                        : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-gray-200 scale-95'
                                }`}
                            >
                                Admin
                            </button>
                        </div>
                    </div>

                    {/* Login Form Container */}
                    <div key={role} className="animate-fade-in">
                        <header className="mb-10">
                            <h2 className="text-3xl font-black text-black dark:text-white tracking-tight mb-2">
                                Welcome back.
                            </h2>
                            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                                Accessing the <span className="text-black dark:text-white font-bold capitalize">{role}</span> environment.
                            </p>
                        </header>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-black dark:text-white tracking-widest uppercase">
                                    {role === 'admin' ? 'Admin Identifier' : 'Candidate Identifier'}
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={userId}
                                    onChange={(e) => setUserId(e.target.value)}
                                    className="block w-full px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl text-black dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-all"
                                    placeholder={role === 'admin' ? "Admin ID" : "Candidate ID"}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-black dark:text-white tracking-widest uppercase">Secret Key</label>
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl text-black dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-all"
                                    placeholder="••••••••"
                                />
                            </div>

                            {error && (
                                <div className="text-red-500 dark:text-red-400 text-xs font-bold bg-red-50 dark:bg-red-900/10 py-4 px-6 rounded-2xl border border-red-100 dark:border-red-900/30">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex justify-center items-center py-5 px-8 border border-transparent rounded-2xl shadow-2xl text-sm font-black text-white bg-black dark:bg-white dark:text-black hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                            >
                                {isLoading ? (
                                    <div className="flex items-center gap-3">
                                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                                        <span>Verifying...</span>
                                    </div>
                                ) : 'SIGN IN'}
                            </button>
                        </form>

                        <footer className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800 space-y-4">
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                <button 
                                    onClick={() => onNavigateToForgotPassword(role)} 
                                    className="text-xs font-bold text-gray-400 hover:text-black dark:hover:text-white transition-colors uppercase tracking-widest"
                                >
                                    Forgot Password?
                                </button>
                                
                                <button 
                                    onClick={() => onNavigateToCreateId(role)} 
                                    className="text-xs font-bold text-black dark:text-white hover:opacity-70 transition-opacity uppercase tracking-widest flex items-center gap-2"
                                >
                                    Create Account
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                </button>
                            </div>
                        </footer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
