import React, { useState } from 'react';

interface LoginPageProps {
    onLogin: () => void;
    onNavigateToCreateId: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onNavigateToCreateId }) => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically validate the user's credentials
        onLogin();
    };

    return (
        <div className="w-full min-h-screen bg-white flex items-center justify-center p-4 animate-fade-in">
            <div className="max-w-md w-full text-center">
                <img 
                    src="https://svgshare.com/i/184T.svg" 
                    alt="TONI&GUY Logo" 
                    className="h-8 w-auto mx-auto mb-8"
                />
                <h1 className="text-3xl font-extrabold text-black tracking-tighter">
                    Welcome Back
                </h1>
                <p className="mt-2 text-gray-500">
                    Sign in to access the VR Training Library.
                </p>

                <form onSubmit={handleSubmit} className="mt-8 text-left space-y-6">
                    <div>
                        <label htmlFor="userid" className="text-sm font-medium text-gray-700">User ID</label>
                        <input
                            id="userid"
                            name="userid"
                            type="text"
                            autoComplete="username"
                            required
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                            placeholder="Enter your user ID"
                        />
                    </div>

                    <div>
                         <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                            placeholder="Enter your password"
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors"
                        >
                            Login
                        </button>
                    </div>
                </form>

                <p className="mt-6 text-center text-sm text-gray-600">
                    Don't have an ID?{' '}
                    <button onClick={onNavigateToCreateId} className="font-medium text-black hover:underline focus:outline-none">
                        Create one
                    </button>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
