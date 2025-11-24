
import React, { useState } from 'react';

interface ForgotPasswordPageProps {
    role: 'admin' | 'candidate';
    onSubmit: () => void;
    onNavigateToLogin: () => void;
}

const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = ({ role, onSubmit, onNavigateToLogin }) => {
    const [userId, setUserId] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!userId.trim()) {
            alert(`Please enter your ${role === 'admin' ? 'Admin' : 'Candidate'} ID.`);
            return;
        }

        if (newPassword.length < 4) {
             alert("Password must be at least 4 characters long.");
             return;
        }

        if (newPassword !== confirmPassword) {
            alert("Passwords don't match!");
            return;
        }

        // Simulating password reset
        alert("Password updated successfully!");
        onSubmit();
    };

    return (
        <div className="w-full min-h-screen bg-white flex items-center justify-center p-4 animate-fade-in">
            <div className="max-w-md w-full text-center">
                <img 
                    src="/images/logo.png" 
                    alt="GenXReality Logo" 
                    className="h-14 w-auto mx-auto mb-8"
                />
                <h1 className="text-3xl font-extrabold text-black tracking-tighter capitalize">
                    Reset Password
                </h1>
                <p className="mt-2 text-gray-500">
                    Update your {role} credentials below.
                </p>

                <form onSubmit={handleSubmit} className="mt-8 text-left space-y-6">
                    <div>
                        <label htmlFor="userid" className="text-sm font-medium text-gray-700">
                            {role === 'admin' ? 'Admin ID' : 'Candidate ID'}
                        </label>
                        <input
                            id="userid"
                            name="userid"
                            type="text"
                            required
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                            placeholder={role === 'admin' ? "Enter admin ID" : "Enter candidate ID"}
                        />
                    </div>

                    <div>
                        <label htmlFor="new-password" className="text-sm font-medium text-gray-700">New Password</label>
                        <input
                            id="new-password"
                            name="new-password"
                            type="password"
                            required
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                            placeholder="Enter new password"
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="confirm-password" className="text-sm font-medium text-gray-700">Confirm Password</label>
                        <input
                            id="confirm-password"
                            name="confirm-password"
                            type="password"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                            placeholder="Confirm new password"
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors"
                        >
                            Update Password
                        </button>
                    </div>
                </form>

                <p className="mt-6 text-center text-sm text-gray-600">
                    Remember your password?{' '}
                    <button onClick={onNavigateToLogin} className="font-medium text-black hover:underline focus:outline-none">
                        Login
                    </button>
                </p>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
