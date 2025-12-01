
import React, { useState } from 'react';
import { ChevronLeftIcon } from '../components/AppIcons';

interface LoginPageProps {
    role: 'admin' | 'candidate';
    onLoginSuccess: () => void;
    onNavigateToCreateId: () => void;
    onNavigateToForgotPassword: () => void;
    onBack: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ role, onLoginSuccess, onNavigateToCreateId, onNavigateToForgotPassword, onBack }) => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (role === 'admin') {
            if (userId.trim().toLowerCase() === 'admin' && password.trim() === 'admin') {
                onLoginSuccess();
            } else {
                setError('Invalid credentials. For demo, use ID: "admin" and Password: "admin"');
            }
        } else {
            if (userId.trim() && password.trim()) {
                onLoginSuccess();
            } else {
                setError('Please enter your credentials');
            }
        }
    };

    return (
        <div className="w-full min-h-screen bg-white flex flex-col items-center justify-center p-4 sm:p-8 animate-fade-in relative">
            {/* Back Button - Relative on small, Absolute on large */}
            <div className="w-full max-w-md absolute top-4 left-4 sm:top-8 sm:left-8 z-10">
                <button 
                    onClick={onBack}
                    className="flex items-center text-sm font-medium text-gray-500 hover:text-black transition-colors"
                >
                    <ChevronLeftIcon className="w-5 h-5 mr-1" />
                    Back
                </button>
            </div>

            <div className="max-w-md w-full text-center mt-12 sm:mt-0">
                <img 
                    src="/images/logo.png" 
                    alt="GenXReality Logo" 
                    className="h-10 sm:h-14 w-auto mx-auto mb-6 sm:mb-8"
                />
                <h1 className="text-2xl sm:text-3xl font-extrabold text-black tracking-tight capitalize">
                    {role} Portal
                </h1>
                <p className="mt-2 text-gray-500 text-sm sm:text-base">
                    Sign in to access the {role === 'admin' ? 'Dashboard' : 'Library'}.
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
                            autoComplete="username"
                            required
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            className="mt-1 block w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all text-sm sm:text-base"
                            placeholder={role === 'admin' ? "Enter admin ID" : "Enter candidate ID"}
                        />
                    </div>

                    <div>
                         <label htmlFor="password" className="text-sm font-semibold text-black">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all text-sm sm:text-base"
                            placeholder="Enter your password"
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
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-bold text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors"
                        >
                            Login
                        </button>
                    </div>
                </form>
                
                <div className="mt-6 flex flex-col space-y-3 text-center text-sm">
                    <button 
                        onClick={onNavigateToForgotPassword} 
                        className="text-gray-500 hover:text-black transition-colors"
                    >
                        Forgot/Change Password
                    </button>
                    
                    <p className="text-gray-500">
                        Don't have an ID?{' '}
                        <button onClick={onNavigateToCreateId} className="font-semibold text-black hover:underline">
                            Create one
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
