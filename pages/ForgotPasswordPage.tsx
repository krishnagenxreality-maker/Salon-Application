
import React, { useState } from 'react';
import { api } from '../services/api';
import { ChevronLeftIcon } from '../components/AppIcons';

interface ForgotPasswordPageProps {
    role: 'admin' | 'candidate';
    onSubmit: () => void;
    onNavigateToLogin: () => void;
}

const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = ({ role, onSubmit, onNavigateToLogin }) => {
    const [userId, setUserId] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        
        if (!userId.trim()) {
            setError(`Please enter your ${role === 'admin' ? 'Admin' : 'Candidate'} ID.`);
            return;
        }

        if (newPassword.length < 4) {
             setError("Password must be at least 4 characters long.");
             return;
        }

        if (newPassword !== confirmPassword) {
            setError("Passwords don't match!");
            return;
        }

        setIsLoading(true);
        try {
            const data = await api.resetPassword(userId.trim(), newPassword, role);
            if (data.success) {
                alert("Password updated successfully!");
                onSubmit();
            } else {
                setError(data.message || 'Failed to reset password');
            }
        } catch (err) {
            setError('Connection failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 w-full h-full bg-black flex items-center justify-center p-4 sm:p-8 animate-fade-in relative overflow-hidden">
            
            {/* CINEMATIC BACKGROUND */}
            <div className="absolute inset-0 z-0">
                <img 
                    src="/images/auth-bg.jpeg" 
                    alt="Academy" 
                    className="w-full h-full object-cover opacity-40 scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90"></div>
                <div className="absolute inset-0 backdrop-blur-[2px]"></div>
            </div>

            {/* Top Navigation */}
            <div className="absolute top-8 left-4 sm:top-12 sm:left-12 z-50">
                <button 
                    onClick={onNavigateToLogin}
                    className="flex items-center text-[10px] font-black text-white/40 hover:text-white transition-all uppercase tracking-[0.3em] group"
                >
                    <ChevronLeftIcon className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Login
                </button>
            </div>

            <div className="relative z-10 max-w-md w-full text-center animate-fade-in-up">
                <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-10 md:p-12 shadow-2xl">
                    <img 
                        src="/images/logo.png" 
                        alt="GenXReality Logo" 
                        className="h-10 sm:h-12 w-auto mx-auto mb-8 brightness-0 invert"
                    />
                    <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tighter capitalize leading-none mb-3">
                        Reset Password
                    </h1>
                    <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em] mb-10">
                        Update your {role} credentials
                    </p>

                    <form onSubmit={handleSubmit} className="mt-6 sm:mt-8 text-left space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="userid" className="text-[9px] font-black text-white/40 uppercase tracking-widest ml-1">
                                {role === 'admin' ? 'Admin ID' : 'Candidate ID'}
                            </label>
                            <input
                                id="userid"
                                type="text"
                                required
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                                className="block w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/20 focus:outline-none focus:border-white/40 transition-all font-semibold text-sm"
                                placeholder={role === 'admin' ? "Enter admin ID" : "Enter candidate ID"}
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="new-password" className="text-[9px] font-black text-white/40 uppercase tracking-widest ml-1">New Password</label>
                            <input
                                id="new-password"
                                type="password"
                                required
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="block w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/20 focus:outline-none focus:border-white/40 transition-all font-semibold text-sm"
                                placeholder="Enter new password"
                            />
                        </div>
                        
                        <div className="space-y-2">
                            <label htmlFor="confirm-password" className="text-[9px] font-black text-white/40 uppercase tracking-widest ml-1">Confirm Password</label>
                            <input
                                id="confirm-password"
                                type="password"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="block w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/20 focus:outline-none focus:border-white/40 transition-all font-semibold text-sm"
                                placeholder="Confirm new password"
                            />
                        </div>

                        {error && (
                            <div className="text-red-400 text-[10px] font-black uppercase tracking-widest text-center py-3 bg-red-400/10 rounded-xl">
                                {error}
                            </div>
                        )}

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex justify-center py-5 px-4 rounded-full text-xs font-black text-black bg-white hover:bg-silver hover:scale-105 active:scale-95 shadow-2xl transition-all disabled:opacity-50 uppercase tracking-[0.3em]"
                            >
                                {isLoading ? 'Updating...' : 'Update Password'}
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-[10px] font-black uppercase tracking-widest text-white/30">
                        Remember your password?{' '}
                        <button onClick={onNavigateToLogin} className="text-white hover:underline ml-1">
                            Login
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
