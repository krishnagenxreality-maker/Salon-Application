
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
        <div className="w-full min-h-screen flex flex-col md:flex-row bg-white transition-colors duration-500 overflow-hidden">
            
            {/* Left Branding Panel */}
            <div className="md:w-1/2 bg-black flex flex-col items-center justify-center p-8 text-center relative overflow-hidden min-h-[40vh] md:min-h-screen">
                <div className="relative z-10 animate-fade-in flex flex-col items-center">
                    <img 
                        src="/images/logo.png" 
                        alt="GenXReality Logo" 
                        className="h-8 sm:h-12 w-auto mb-6 brightness-0 invert opacity-90"
                    />
                    
                    {/* TONI&GUY remains extra bold as requested */}
                    <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white tracking-tighter leading-[0.85] drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] select-none uppercase">
                        TONI<br/>&GUY
                    </h1>
                    <div className="mt-8 flex flex-col items-center">
                        <div className="w-12 h-[1px] bg-white/20 mb-4"></div>
                        <p className="text-gray-400 text-[10px] sm:text-xs font-semibold tracking-[0.4em] uppercase animate-pulse">
                            Academy Portal
                        </p>
                    </div>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle,rgba(255,255,255,0.05)_0%,transparent_70%)] pointer-events-none"></div>
            </div>

            {/* Right Auth Panel - Made smaller/compact */}
            <div className="md:w-1/2 flex items-center justify-center p-6 sm:p-10 lg:p-16 bg-white overflow-y-auto custom-scrollbar">
                <div className="max-w-sm w-full animate-slide-up">
                    
                    <div className="mb-6 sm:mb-8">
                        <label className="text-[10px] font-bold text-gray-400 tracking-[0.2em] uppercase mb-3 block text-center">
                            Role Identity
                        </label>
                        <div className="bg-gray-50 p-1 rounded-2xl flex items-center border border-gray-100">
                            <button
                                onClick={() => toggleRole('candidate')}
                                className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all duration-300 ${
                                    role === 'candidate' 
                                        ? 'bg-black text-white shadow-md' 
                                        : 'text-gray-400 hover:text-black'
                                }`}
                            >
                                Candidate
                            </button>
                            <button
                                onClick={() => toggleRole('admin')}
                                className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all duration-300 ${
                                    role === 'admin' 
                                        ? 'bg-black text-white shadow-md' 
                                        : 'text-gray-400 hover:text-black'
                                }`}
                            >
                                Admin
                            </button>
                        </div>
                    </div>

                    <div key={role} className="animate-fade-in">
                        <header className="mb-6 sm:mb-8">
                            <h2 className="text-xl sm:text-2xl font-bold text-black tracking-tight mb-1">
                                Welcome Back
                            </h2>
                            <p className="text-gray-500 text-xs sm:text-sm font-medium">
                                Authentication for <span className="text-black font-bold capitalize">{role}</span> environment.
                            </p>
                        </header>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-black tracking-widest uppercase ml-1">
                                    Identifier
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={userId}
                                    onChange={(e) => setUserId(e.target.value)}
                                    className="block w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-black placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent transition-all text-sm"
                                    placeholder={role === 'admin' ? "Admin ID" : "Candidate ID"}
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-black tracking-widest uppercase ml-1">Secret Key</label>
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-black placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent transition-all text-sm"
                                    placeholder="••••••••"
                                />
                            </div>

                            {error && (
                                <div className="text-red-500 text-[10px] font-bold bg-red-50 py-2.5 px-4 rounded-xl border border-red-100">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex justify-center items-center py-3.5 px-6 border border-transparent rounded-full shadow-lg text-xs font-bold text-white bg-black hover:bg-gray-800 active:scale-[0.98] transition-all disabled:opacity-50 mt-2"
                            >
                                {isLoading ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                                        <span>Verifying...</span>
                                    </div>
                                ) : 'SIGN IN'}
                            </button>
                        </form>

                        <footer className="mt-8 pt-5 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <button 
                                onClick={() => onNavigateToForgotPassword(role)} 
                                className="text-[10px] font-bold text-gray-400 hover:text-black transition-colors uppercase tracking-widest"
                            >
                                Reset Key
                            </button>
                            
                            <button 
                                onClick={() => onNavigateToCreateId(role)} 
                                className="text-[10px] font-bold text-black hover:opacity-70 transition-opacity uppercase tracking-widest flex items-center gap-1.5"
                            >
                                Register ID
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                            </button>
                        </footer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
