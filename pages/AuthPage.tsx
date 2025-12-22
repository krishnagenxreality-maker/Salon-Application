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

    const isAdmin = role === 'admin';

    return (
        <div className="w-full min-h-screen relative overflow-x-hidden overflow-y-auto bg-black perspective-[2000px] custom-scrollbar selection:bg-white selection:text-black">
            
            {/* 1. Layered Background for Smooth Cross-fade */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <img 
                    src="/images/auth-bg.jpeg" 
                    alt="Background" 
                    className="w-full h-full object-cover grayscale-[30%] opacity-50"
                />
                
                {/* Dynamic Overlays */}
                <div className={`absolute inset-0 transition-opacity duration-1000 ease-in-out bg-gradient-to-b md:bg-gradient-to-r from-black/95 via-black/30 to-white/90 ${
                    isAdmin ? 'opacity-0' : 'opacity-100'
                }`}></div>

                <div className={`absolute inset-0 transition-opacity duration-1000 ease-in-out bg-gradient-to-b md:bg-gradient-to-r from-white/95 via-white/30 to-black/95 ${
                    isAdmin ? 'opacity-100' : 'opacity-0'
                }`}></div>
            </div>

            {/* Central Vertical Fold Line (Foldable Optimization) */}
            <div className="fixed inset-y-0 left-1/2 w-[1px] bg-white/5 z-[5] hidden md:block"></div>

            {/* 2. Main Content Container - Compact Grid Split */}
            <div className="relative z-10 w-full min-h-screen grid grid-cols-1 md:grid-cols-2">
                
                {/* Branding Block - Scaled Down Typography */}
                <div className="flex flex-col items-center justify-center text-center p-6 md:p-8 lg:p-12 animate-fade-in pt-16 md:pt-0">
                    <h1 className="text-[clamp(2.5rem,7vw,6rem)] font-black text-white tracking-tighter leading-[0.8] drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)] select-none uppercase transition-all duration-700">
                        GENX<br/>REALITY
                    </h1>
                    <div className="mt-4 md:mt-6 flex flex-col items-center">
                        <div className="w-10 md:w-12 h-[1px] bg-white/30 mb-2 md:mb-4"></div>
                        <p className="text-white/60 text-[8px] sm:text-[10px] font-bold tracking-[0.4em] md:tracking-[0.5em] uppercase animate-pulse">
                            Academy Portal
                        </p>
                    </div>
                </div>

                {/* Login Block - Compact Interaction Card */}
                <div className="flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 pb-16 md:pb-0">
                    
                    {/* Compact 3D Flipping Card - Balanced Medium Width (380px) */}
                    <div className="relative w-full max-w-[380px] h-[500px] sm:h-[560px] preserve-3d transition-transform duration-1000 cubic-bezier(0.4, 0, 0.2, 1)" 
                         style={{ transform: isAdmin ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
                        
                        {/* FRONT FACE (Candidate) */}
                        <div className="absolute inset-0 backface-hidden bg-white/10 backdrop-blur-3xl p-6 sm:p-10 rounded-[2rem] sm:rounded-[3rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] border border-white/20 flex flex-col">
                            <RoleToggle activeRole={role} onToggle={toggleRole} />
                            
                            <div className="flex-1 flex flex-col mt-6 sm:mt-8">
                                <header className="mb-4 sm:mb-6">
                                    <h2 className="text-xl sm:text-2xl font-bold text-black tracking-tight mb-0.5">Welcome back</h2>
                                    <p className="text-gray-600 text-[8px] sm:text-[10px] font-bold uppercase tracking-wider opacity-70">Candidate Portal Access</p>
                                </header>

                                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 flex-grow">
                                    <div className="space-y-1 sm:space-y-1.5">
                                        <label className="text-[7px] sm:text-[9px] font-bold text-black/50 tracking-widest uppercase ml-1">Identifier</label>
                                        <input
                                            type="text"
                                            required
                                            value={userId}
                                            onChange={(e) => setUserId(e.target.value)}
                                            className="block w-full px-4 py-2.5 sm:px-5 sm:py-3.5 bg-white/70 border border-gray-100 rounded-lg sm:rounded-xl text-black placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-black/5 focus:border-black transition-all text-sm font-semibold shadow-sm"
                                            placeholder="Candidate ID"
                                        />
                                    </div>

                                    <div className="space-y-1 sm:space-y-1.5">
                                        <label className="text-[7px] sm:text-[9px] font-bold text-black/50 tracking-widest uppercase ml-1">Secret Key</label>
                                        <input
                                            type="password"
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="block w-full px-4 py-2.5 sm:px-5 sm:py-3.5 bg-white/70 border border-gray-100 rounded-lg sm:rounded-xl text-black placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-black/5 focus:border-black transition-all text-sm font-semibold shadow-sm"
                                            placeholder="••••••••"
                                        />
                                    </div>

                                    {error && <div className="text-red-700 text-[8px] sm:text-[9px] font-bold bg-red-500/5 py-1.5 sm:py-3 px-4 rounded-lg border border-red-200/50">{error}</div>}

                                    <button type="submit" disabled={isLoading} className="w-full flex justify-center items-center py-3 sm:py-4 px-6 rounded-full shadow-xl text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-white bg-black hover:bg-gray-800 transition-all mt-2 sm:mt-4 active:scale-95 disabled:opacity-50">
                                        {isLoading ? 'Authorizing...' : 'Sign In'}
                                    </button>
                                </form>

                                <footer className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-black/5 flex items-center justify-between">
                                    <button type="button" onClick={() => onNavigateToForgotPassword('candidate')} className="text-[8px] sm:text-[9px] font-bold text-gray-500 hover:text-black uppercase tracking-widest transition-colors">Forgot Key</button>
                                    <button type="button" onClick={() => onNavigateToCreateId('candidate')} className="text-[8px] sm:text-[9px] font-bold text-black hover:opacity-70 uppercase tracking-widest flex items-center gap-1.5 transition-opacity">
                                        Register
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                    </button>
                                </footer>
                            </div>
                        </div>

                        {/* BACK FACE (Admin) */}
                        <div className="absolute inset-0 backface-hidden bg-white/10 backdrop-blur-3xl p-6 sm:p-10 rounded-[2rem] sm:rounded-[3rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] border border-white/20 flex flex-col"
                             style={{ transform: 'rotateY(180deg)' }}>
                            <RoleToggle activeRole={role} onToggle={toggleRole} />

                            <div className="flex-1 flex flex-col mt-6 sm:mt-8">
                                <header className="mb-4 sm:mb-6">
                                    <h2 className="text-xl sm:text-2xl font-bold text-black tracking-tight mb-0.5">Security Hub</h2>
                                    <p className="text-gray-600 text-[8px] sm:text-[10px] font-bold uppercase tracking-wider opacity-70">Admin Access Terminal</p>
                                </header>

                                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 flex-grow">
                                    <div className="space-y-1 sm:space-y-1.5">
                                        <label className="text-[7px] sm:text-[9px] font-bold text-black/50 tracking-widest uppercase ml-1">Admin Identity</label>
                                        <input
                                            type="text"
                                            required
                                            value={userId}
                                            onChange={(e) => setUserId(e.target.value)}
                                            className="block w-full px-4 py-2.5 sm:px-5 sm:py-3.5 bg-white/70 border border-gray-100 rounded-lg sm:rounded-xl text-black placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-black/5 focus:border-black transition-all text-sm font-semibold shadow-sm"
                                            placeholder="Admin ID"
                                        />
                                    </div>

                                    <div className="space-y-1 sm:space-y-1.5">
                                        <label className="text-[7px] sm:text-[9px] font-bold text-black/50 tracking-widest uppercase ml-1">Access Key</label>
                                        <input
                                            type="password"
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="block w-full px-4 py-2.5 sm:px-5 sm:py-3.5 bg-white/70 border border-gray-100 rounded-lg sm:rounded-xl text-black placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-black/5 focus:border-black transition-all text-sm font-semibold shadow-sm"
                                            placeholder="••••••••"
                                        />
                                    </div>

                                    {error && <div className="text-red-700 text-[8px] sm:text-[9px] font-bold bg-red-500/5 py-1.5 sm:py-3 px-4 rounded-lg border border-red-200/50">{error}</div>}

                                    <button type="submit" disabled={isLoading} className="w-full flex justify-center items-center py-3 sm:py-4 px-6 rounded-full shadow-xl text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-white bg-black hover:bg-gray-800 transition-all mt-2 sm:mt-4 active:scale-95 disabled:opacity-50">
                                        {isLoading ? 'Decrypting...' : 'Secure Login'}
                                    </button>
                                </form>

                                <footer className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-black/5 flex items-center justify-between">
                                    <button type="button" onClick={() => onNavigateToForgotPassword('admin')} className="text-[8px] sm:text-[9px] font-bold text-gray-500 hover:text-black uppercase tracking-widest transition-colors">Forgot Key</button>
                                    <button type="button" onClick={() => onNavigateToCreateId('admin')} className="text-[8px] sm:text-[9px] font-bold text-black hover:opacity-70 uppercase tracking-widest flex items-center gap-1.5 transition-opacity">
                                        Create Admin ID
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                    </button>
                                </footer>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .preserve-3d { transform-style: preserve-3d; }
                .backface-hidden { backface-visibility: hidden; }
                @media (max-width: 768px) {
                  .pt-16 { padding-top: 2rem; }
                }
            `}</style>
        </div>
    );
};

/* Internal Component for the Integrated Role Switcher - Compact Scale */
const RoleToggle = ({ activeRole, onToggle }: { activeRole: string, onToggle: (role: 'candidate' | 'admin') => void }) => (
    <div className="w-full">
        <label className="text-[7px] sm:text-[8px] font-bold text-black/40 tracking-[0.25em] uppercase mb-2 sm:mb-3 block text-center">
            Identify Profile
        </label>
        <div className="bg-black/30 backdrop-blur-md p-0.5 sm:p-1 rounded-xl sm:rounded-2xl flex items-center border border-white/10 shadow-inner">
            <button
                onClick={() => onToggle('candidate')}
                className={`flex-1 py-1.5 sm:py-2.5 px-2 sm:px-3 rounded-lg sm:rounded-xl text-[7px] sm:text-[9px] font-bold uppercase tracking-widest transition-all duration-500 text-white ${
                    activeRole === 'candidate' 
                        ? 'bg-black shadow-lg scale-[1.02] border border-white/10' 
                        : 'opacity-40 hover:opacity-100'
                }`}
            >
                Candidate
            </button>
            <button
                onClick={() => onToggle('admin')}
                className={`flex-1 py-1.5 sm:py-2.5 px-2 sm:px-3 rounded-lg sm:rounded-xl text-[7px] sm:text-[9px] font-bold uppercase tracking-widest transition-all duration-500 text-white ${
                    activeRole === 'admin' 
                        ? 'bg-black shadow-lg scale-[1.02] border border-white/10' 
                        : 'opacity-40 hover:opacity-100'
                }`}
            >
                Admin
            </button>
        </div>
    </div>
);

export default AuthPage;