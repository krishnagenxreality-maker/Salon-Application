
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
        <div className="w-full min-h-screen bg-white flex items-center justify-center p-4 sm:p-8 animate-fade-in relative">
            {/* Top Navigation */}
            <div className="absolute top-8 left-4 sm:top-12 sm:left-12 z-50">
                <button 
                    onClick={onNavigateToLogin}
                    className="flex items-center text-sm font-bold text-gray-500 hover:text-black transition-colors uppercase tracking-widest"
                >
                    <ChevronLeftIcon className="w-5 h-5 mr-2" />
                    Back to Login
                </button>
            </div>

            <div className="max-w-md w-full text-center">
                <img 
                    src="/images/logo.png" 
                    alt="GenXReality Logo" 
                    className="h-10 sm:h-14 w-auto mx-auto mb-6 sm:mb-8"
                />
                <h1 className="text-2xl sm:text-3xl font-extrabold text-black tracking-tight capitalize">
                    Reset Password
                </h1>
                <p className="mt-2 text-gray-500 text-sm sm:text-base">
                    Update your {role} credentials below.
                </p>

                <form onSubmit={handleSubmit} className="mt-6 sm:mt-8 text-left space-y-4 sm:space-y-5">
                    <div>
                        <label htmlFor="userid" className="text-sm font-semibold text-black">
                            {role === 'admin' ? 'Admin ID' : 'Candidate ID'}
                        </label>
                        <input
                            id="userid"
                            name="userid"
                            type="text"
                            required
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            className="mt-1 block w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all text-sm sm:text-base"
                            placeholder={role === 'admin' ? "Enter admin ID" : "Enter candidate ID"}
                        />
                    </div>

                    <div>
                        <label htmlFor="new-password" className="text-sm font-semibold text-black">New Password</label>
                        <input
                            id="new-password"
                            name="new-password"
                            type="password"
                            required
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="mt-1 block w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all text-sm sm:text-base"
                            placeholder="Enter new password"
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="confirm-password" className="text-sm font-semibold text-black">Confirm Password</label>
                        <input
                            id="confirm-password"
                            name="confirm-password"
                            type="password"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="mt-1 block w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all text-sm sm:text-base"
                            placeholder="Confirm new password"
                        />
                    </div>

                    {error && (
                        <div className="text-red-500 text-xs sm:text-sm text-center font-medium bg-red-50 py-2 rounded">
                            {error}
                        </div>
                    )}

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-bold text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors disabled:opacity-50"
                        >
                            {isLoading ? 'Updating...' : 'Update Password'}
                        </button>
                    </div>
                </form>

                <p className="mt-6 text-center text-sm text-gray-500">
                    Remember your password?{' '}
                    <button onClick={onNavigateToLogin} className="font-semibold text-black hover:underline">
                        Login
                    </button>
                </p>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
