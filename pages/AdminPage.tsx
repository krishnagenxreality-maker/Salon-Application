
import React, { useEffect, useState } from 'react';
import { UserCircleIcon, CalendarIcon, ClockIcon, UserGroupIcon, ChevronRightIcon, CheckIcon } from '../components/AppIcons';
import { api } from '../services/api';
import { User } from '../types';

interface AdminPageProps {
    onSelectCandidate: (candidateId: string) => void;
}

const AdminPage: React.FC<AdminPageProps> = ({ onSelectCandidate }) => {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            const data = await api.getAllUsers();
            setUsers(Array.isArray(data) ? data : []);
            setIsLoading(false);
        };
        fetchUsers();
    }, []);

    const totalCompletions = users.reduce((acc, user) => acc + (user.completedTechniques?.length || 0), 0);
    const totalSessions = users.reduce((acc, user) => acc + (user.customerSessions?.length || 0), 0);

    return (
        <div className="w-full min-h-screen bg-white pt-28 md:pt-32 pb-16 px-4 sm:px-6 md:px-8 lg:px-12 animate-fade-in">
             <div className="max-w-screen-xl mx-auto">
                {/* Header */}
                <div className="mb-8 sm:mb-12 border-b border-gray-200 pb-6 sm:pb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-black tracking-tighter">
                            Admin Dashboard
                        </h1>
                        <p className="mt-2 text-gray-500 text-base sm:text-lg">
                            System Overview & User Management
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                        <div className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-100 rounded-full text-xs sm:text-sm font-medium text-gray-600">
                            <CalendarIcon className="w-4 h-4" />
                            <span>{new Date().toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-green-100 text-green-700 rounded-full text-xs sm:text-sm font-bold">
                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span>System Online</span>
                        </div>
                    </div>
                </div>

                {/* Dashboard Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12 animate-slide-up">
                    {[
                        { label: 'Total Candidates', value: users.length.toString(), icon: UserGroupIcon },
                        { label: 'Modules Completed', value: totalCompletions.toString(), icon: CheckIcon },
                        { label: 'Live Sessions', value: totalSessions.toString(), icon: ClockIcon },
                        { label: 'Active Today', value: isLoading ? '-' : users.length > 0 ? '1' : '0', icon: UserCircleIcon },
                    ].map((stat, idx) => (
                        <div key={idx} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex items-center justify-between">
                            <div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">{stat.label}</p>
                                <p className="text-2xl sm:text-3xl font-extrabold text-black">{stat.value}</p>
                            </div>
                            <div className="h-10 w-10 bg-light-grey rounded-full flex items-center justify-center text-black">
                                <stat.icon className="w-5 h-5" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Candidates List */}
                <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
                    <h2 className="text-xl font-bold text-black mb-6">Registered Candidates</h2>
                    
                    {isLoading ? (
                        <div className="text-center py-12 text-gray-500">Loading candidate data...</div>
                    ) : (
                    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                        <div className="grid grid-cols-12 bg-gray-50 p-4 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200">
                            <div className="col-span-3 sm:col-span-2">ID</div>
                            <div className="col-span-5 sm:col-span-4">Name</div>
                            <div className="col-span-4 sm:col-span-3 text-right sm:text-left">Application No.</div>
                            <div className="hidden sm:block col-span-2 text-center">Progress</div>
                            <div className="hidden sm:block col-span-1"></div>
                        </div>

                        <div className="divide-y divide-gray-100">
                            {users.length === 0 ? (
                                <div className="p-8 text-center text-gray-500">No candidates registered yet.</div>
                            ) : (
                                users.map((user) => (
                                    <button 
                                        key={user.id}
                                        onClick={() => onSelectCandidate(user.id)}
                                        className="w-full grid grid-cols-12 p-4 items-center hover:bg-gray-50 transition-colors text-left group"
                                    >
                                        <div className="col-span-3 sm:col-span-2 text-sm font-mono font-medium text-gray-500">
                                            #{user.id.slice(0,6)}
                                        </div>
                                        <div className="col-span-5 sm:col-span-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-8 w-8 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold">
                                                    {(user.name || 'C').charAt(0)}
                                                </div>
                                                <span className="text-sm sm:text-base font-bold text-black">{user.name}</span>
                                            </div>
                                        </div>
                                        <div className="col-span-4 sm:col-span-3 text-sm text-gray-600 text-right sm:text-left">
                                            {user.applicationNumber}
                                        </div>
                                        <div className="hidden sm:block col-span-2 text-center">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                {(user.completedTechniques?.length || 0) + (user.customerSessions?.length || 0)} Acts
                                            </span>
                                        </div>
                                        <div className="hidden sm:block col-span-1 text-right">
                                            <ChevronRightIcon className="w-5 h-5 text-gray-300 group-hover:text-black transition-colors ml-auto" />
                                        </div>
                                    </button>
                                ))
                            )}
                        </div>
                    </div>
                    )}
                </div>
             </div>
        </div>
    );
};

export default AdminPage;
