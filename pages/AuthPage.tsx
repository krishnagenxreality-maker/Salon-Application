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
        <div className="w-full min-h-screen relative overflow-x-hidden overflow-y-auto bg-white perspective-[2500px] custom-scrollbar">
            
            {/* 1. Layered Background for Smooth Cross-fade */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <img 
                    src="/images/auth-bg.jpeg" 
                    alt="Salon Background" 
                    className="w-full h-full object-cover grayscale-[30%]"
                />
                
                {/* Candidate Dark Overlay */}
                <div className={`absolute inset-0 transition-opacity duration-1000 ease-in-out bg-gradient-to-b md:bg-gradient-to-r from-black/95 via-black/40 to-white/98 ${
                    isAdmin ? 'opacity-0' : 'opacity-100'
                }`}></div>

                {/* Admin Light Overlay */}
                <div className={`absolute inset-0 transition-opacity duration-1000 ease-in-out bg-gradient-to-b md:bg-gradient-to-r from-white/98 via-white/40 to-black/95 ${
                    isAdmin ? 'opacity-100' : 'opacity-0'
                }`}></div>
            </div>

            {/* 2. Main Content Container - Optimized for Mobile Scroll */}
            <div className="relative z-10 w-full min-h-screen flex flex-col md:flex-row items-center justify-start md:justify-center p-6 sm:p-8 md:p-12 lg:p-16 pt-20 md:pt-12 pb-16">
                
                {/* Branding Block - Responsive Sizing */}
                <div className="w-full md:w-1/2 flex flex-col items-center justify-center text-center mb-10 md:mb-0">
                    <div className="animate-fade-in flex flex-col items-center">
                        <img 
                            src="/images/logo.png" 
                            alt="Logo" 
                            className="h-7 md:h-10 w-auto mb-5 md:mb-8 brightness-0 invert opacity-80"
                        />
                        <h1 className="text-5xl sm:text-7xl lg:text-9xl font-black text-white tracking-tighter leading-[0.8] drop-shadow-[0_25px_50px_rgba(0,0,0,0.5)] select-none uppercase transition-all">
                            TONI<br/>&GUY
                        </h1>
                        <div className="mt-6 md:mt-10 flex flex-col items-center">
                            <div className="w-10 md:w-16 h-[1px] bg-white/30 mb-3 md:mb-5"></div>
                            <p className="text-white/70 text-[8px] sm:text-xs font-bold tracking-[0.4em] md:tracking-[0.5em] uppercase animate-pulse">
                                Academy Portal
                            </p>
                        </div>
                    </div>
                </div>

                {/* Login Block - Static Position */}
                <div className="w-full md:w-1/2 flex items-center justify-center">
                    
                    {/* 3D Flipping Card Container - Adjusted Height for Mobile */}
                    <div className="relative w-full max-w-md h-[550px] sm:h-[620px] preserve-3d transition-transform duration-1000 cubic-bezier(0.4, 0, 0.2, 1)" 
                         style={{ transform: isAdmin ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
                        
                        {/* FRONT FACE (Candidate) */}
                        <div className="absolute inset-0 backface-hidden bg-white/10 backdrop-blur-2xl p-7 sm:p-10 rounded-[2.5rem] sm:rounded-[3.5rem] shadow-[0_50px_100px_-30px_rgba(0,0,0,0.4)] border border-white/30 flex flex-col">
                            <RoleToggle activeRole={role} onToggle={toggleRole} />
                            
                            <div className="flex-1 flex flex-col mt-6 sm:mt-8">
                                <header className="mb-5 sm:mb-8">
                                    <h2 className="text-2xl sm:text-3xl font-bold text-black tracking-tight mb-1">Welcome back</h2>
                                    <p className="text-gray-600 text-[9px] sm:text-xs font-bold uppercase tracking-wider">Candidate Portal Access</p>
                                </header>

                                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 flex-grow">
                                    <div className="space-y-1 sm:space-y-1.5">
                                        <label className="text-[8px] sm:text-[10px] font-bold text-black tracking-widest uppercase ml-1">Identifier</label>
                                        <input
                                            type="text"
                                            required
                                            value={userId}
                                            onChange={(e) => setUserId(e.target.value)}
                                            className="block w-full px-5 py-3 sm:px-6 sm:py-4 bg-white/70 border border-gray-100 rounded-xl sm:rounded-2xl text-black placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-black/5 focus:border-black transition-all text-sm font-medium"
                                            placeholder="Candidate ID"
                                        />
                                    </div>

                                    <div className="space-y-1 sm:space-y-1.5">
                                        <label className="text-[8px] sm:text-[10px] font-bold text-black tracking-widest uppercase ml-1">Secret Key</label>
                                        <input
                                            type="password"
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="block w-full px-5 py-3 sm:px-6 sm:py-4 bg-white/70 border border-gray-100 rounded-xl sm:rounded-2xl text-black placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-black/5 focus:border-black transition-all text-sm font-medium"
                                            placeholder="••••••••"
                                        />
                                    </div>

                                    {error && <div className="text-red-600 text-[9px] sm:text-[10px] font-bold bg-red-50/90 py-2 sm:py-3 px-4 rounded-xl border border-red-100">{error}</div>}

                                    <button type="submit" disabled={isLoading} className="w-full flex justify-center items-center py-3.5 sm:py-4 px-6 rounded-full shadow-2xl text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-white bg-black hover:bg-gray-800 transition-all mt-3 sm:mt-6 active:scale-95 disabled:opacity-50">
                                        {isLoading ? 'Authorizing...' : 'Sign In'}
                                    </button>
                                </form>

                                <footer className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-black/5 flex items-center justify-between">
                                    <button type="button" onClick={() => onNavigateToForgotPassword('candidate')} className="text-[9px] sm:text-[10px] font-bold text-gray-500 hover:text-black uppercase tracking-widest transition-colors">Forgot Key</button>
                                    <button type="button" onClick={() => onNavigateToCreateId('candidate')} className="text-[9px] sm:text-[10px] font-bold text-black hover:opacity-70 uppercase tracking-widest flex items-center gap-1.5 sm:gap-2 transition-opacity">
                                        Register
                                        <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                    </button>
                                </footer>
                            </div>
                        </div>

                        {/* BACK FACE (Admin) */}
                        <div className="absolute inset-0 backface-hidden bg-white/10 backdrop-blur-2xl p-7 sm:p-10 rounded-[2.5rem] sm:rounded-[3.5rem] shadow-[0_50px_100px_-30px_rgba(0,0,0,0.4)] border border-white/30 flex flex-col"
                             style={{ transform: 'rotateY(180deg)' }}>
                            <RoleToggle activeRole={role} onToggle={toggleRole} />

                            <div className="flex-1 flex flex-col mt-6 sm:mt-8">
                                <header className="mb-5 sm:mb-8">
                                    <h2 className="text-2xl sm:text-3xl font-bold text-black tracking-tight mb-1">Security Hub</h2>
                                    <p className="text-gray-600 text-[9px] sm:text-xs font-bold uppercase tracking-wider">Admin Access Terminal</p>
                                </header>

                                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 flex-grow">
                                    <div className="space-y-1 sm:space-y-1.5">
                                        <label className="text-[8px] sm:text-[10px] font-bold text-black tracking-widest uppercase ml-1">Admin Identity</label>
                                        <input
                                            type="text"
                                            required
                                            value={userId}
                                            onChange={(e) => setUserId(e.target.value)}
                                            className="block w-full px-5 py-3 sm:px-6 sm:py-4 bg-white/70 border border-gray-100 rounded-xl sm:rounded-2xl text-black placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-black/5 focus:border-black transition-all text-sm font-medium"
                                            placeholder="Admin ID"
                                        />
                                    </div>

                                    <div className="space-y-1 sm:space-y-1.5">
                                        <label className="text-[8px] sm:text-[10px] font-bold text-black tracking-widest uppercase ml-1">Access Key</label>
                                        <input
                                            type="password"
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="block w-full px-5 py-3 sm:px-6 sm:py-4 bg-white/70 border border-gray-100 rounded-xl sm:rounded-2xl text-black placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-black/5 focus:border-black transition-all text-sm font-medium"
                                            placeholder="••••••••"
                                        />
                                    </div>

                                    {error && <div className="text-red-600 text-[9px] sm:text-[10px] font-bold bg-red-50/90 py-2 sm:py-3 px-4 rounded-xl border border-red-100">{error}</div>}

                                    <button type="submit" disabled={isLoading} className="w-full flex justify-center items-center py-3.5 sm:py-4 px-6 rounded-full shadow-2xl text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-white bg-black hover:bg-gray-800 transition-all mt-3 sm:mt-6 active:scale-95 disabled:opacity-50">
                                        {isLoading ? 'Decrypting...' : 'Secure Login'}
                                    </button>
                                </form>

                                <footer className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-black/5 flex items-center justify-between">
                                    <button type="button" onClick={() => onNavigateToForgotPassword('admin')} className="text-[9px] sm:text-[10px] font-bold text-gray-500 hover:text-black uppercase tracking-widest transition-colors">Forgot Key</button>
                                    <button type="button" onClick={() => onNavigateToCreateId('admin')} className="text-[9px] sm:text-[10px] font-bold text-black hover:opacity-70 uppercase tracking-widest flex items-center gap-1.5 sm:gap-2 transition-opacity">
                                        Create Admin ID
                                        <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
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
            `}</style>
        </div>
    );
};

/* Internal Component for the Integrated Role Switcher */
const RoleToggle = ({ activeRole, onToggle }: { activeRole: string, onToggle: (role: 'candidate' | 'admin') => void }) => (
    <div className="w-full">
        <label className="text-[8px] sm:text-[10px] font-bold text-black/40 tracking-[0.2em] uppercase mb-2.5 sm:mb-4 block text-center">
            Identify Profile
        </label>
        <div className="bg-black/30 backdrop-blur-md p-1 rounded-xl sm:rounded-2xl flex items-center border border-white/10 shadow-inner">
            <button
                onClick={() => onToggle('candidate')}
                className={`flex-1 py-2 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl text-[8px] sm:text-[10px] font-bold uppercase tracking-widest transition-all duration-500 text-white ${
                    activeRole === 'candidate' 
                        ? 'bg-black shadow-xl scale-[1.02]' 
                        : 'opacity-50 hover:opacity-100'
                }`}
            >
                Candidate
            </button>
            <button
                onClick={() => onToggle('admin')}
                className={`flex-1 py-2 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl text-[8px] sm:text-[10px] font-bold uppercase tracking-widest transition-all duration-500 text-white ${
                    activeRole === 'admin' 
                        ? 'bg-black shadow-xl scale-[1.02]' 
                        : 'opacity-50 hover:opacity-100'
                }`}
            >
                Admin
            </button>
        </div>
    </div>
);

export default AuthPage;