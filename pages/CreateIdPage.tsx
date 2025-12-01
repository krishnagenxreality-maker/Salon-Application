
import React, { useState } from 'react';

interface CreateIdPageProps {
    role: 'admin' | 'candidate';
    onCreateId: () => void;
    onNavigateToLogin: () => void;
}

const CreateIdPage: React.FC<CreateIdPageProps> = ({ role, onCreateId, onNavigateToLogin }) => {
    const [applicationNumber, setApplicationNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords don't match!");
            return;
        }
        onCreateId();
    };

    return (
        <div className="w-full min-h-screen bg-white flex items-center justify-center p-4 sm:p-8 animate-fade-in">
            <div className="max-w-md w-full text-center">
                <img 
                    src="/images/logo.png" 
                    alt="GenXReality Logo" 
                    className="h-10 sm:h-14 w-auto mx-auto mb-6 sm:mb-8"
                />
                <h1 className="text-2xl sm:text-3xl font-extrabold text-black tracking-tight capitalize">
                    Create {role} ID
                </h1>
                <p className="mt-2 text-gray-500 text-sm sm:text-base">
                    Enter your details to register as a new {role}.
                </p>

                <form onSubmit={handleSubmit} className="mt-6 sm:mt-8 text-left space-y-4 sm:space-y-5">
                    <div>
                        <label htmlFor="applicationNumber" className="text-sm font-semibold text-black">
                            {role === 'admin' ? 'Admin Reference Code' : 'Application Number'}
                        </label>
                        <input
                            id="applicationNumber"
                            name="applicationNumber"
                            type="text"
                            required
                            value={applicationNumber}
                            onChange={(e) => setApplicationNumber(e.target.value)}
                            className="mt-1 block w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all text-sm sm:text-base"
                            placeholder={role === 'admin' ? "Enter reference code" : "Enter application number"}
                        />
                    </div>

                    <div>
                        <label htmlFor="create-password" className="text-sm font-semibold text-black">Create Password</label>
                        <input
                            id="create-password"
                            name="password"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all text-sm sm:text-base"
                            placeholder="Create a strong password"
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
                            placeholder="Confirm your password"
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-bold text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors"
                        >
                            Create {role} ID
                        </button>
                    </div>
                </form>

                <p className="mt-6 text-center text-sm text-gray-500">
                    Already have an ID?{' '}
                    <button onClick={onNavigateToLogin} className="font-semibold text-black hover:underline">
                        Login
                    </button>
                </p>
            </div>
        </div>
    );
};

export default CreateIdPage;
