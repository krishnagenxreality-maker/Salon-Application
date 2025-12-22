
import React, { useEffect, useState } from 'react';
import { UserCircleIcon, CalendarIcon, ClockIcon, UserGroupIcon, ChevronRightIcon, CheckIcon, LogoutIcon } from '../components/AppIcons';
import { api } from '../services/api';
import { User } from '../types';

const DEFAULT_BG = '/images/auth-bg.jpeg';

interface AdminPageProps {
    onSelectCandidate: (candidateId: string) => void;
    onSignOut: () => void;
}

const AdminPage: React.FC<AdminPageProps> = ({ onSelectCandidate, onSignOut }) => {
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
        <div className="fixed inset-0 w-full h-full bg-black overflow-y-auto custom-scrollbar animate-fade-in pb-20">
            
            {/* BACKGROUND */}
            <div className="fixed inset-0 z-0">
                <img 
                    src={DEFAULT_BG} 
                    alt="Background" 
                    className="w-full h-full object-cover opacity-30 scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90"></div>
            </div>

            {/* DARK PILL HEADER - Symmetrical 3-Column Layout */}
            <div className="fixed top-6 left-1/2 -translate-x-1/2 w-[94%] max-w-7xl z-[100] animate-fade-in">
                <header className="h-16 flex items-center justify-between px-8 rounded-full bg-black/40 backdrop-blur-3xl border border-white/10 shadow-2xl">
                    {/* Left: Dashboard Title */}
                    <div className="flex-1 flex flex-col justify-center">
                        <h1 className="text-[14px] sm:text-[16px] font-black text-white tracking-tight leading-none uppercase">Admin Dashboard</h1>
                        <p className="text-[7px] font-bold text-white/30 uppercase tracking-widest mt-1 hidden xs:block">Overview & Management</p>
                    </div>

                    {/* Center: Branding Logo */}
                    <div className="flex-1 flex justify-center">
                        <img src="/images/logo.png" alt="GenXReality" className="h-10 w-auto brightness-0 invert opacity-100" />
                    </div>

                    {/* Right: System Status & Logout */}
                    <div className="flex-1 flex items-center justify-end gap-3">
                        <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/5 rounded-full text-[9px] font-black uppercase tracking-widest text-white/40">
                            <CalendarIcon className="w-3.5 h-3.5" />
                            <span>{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                        </div>
                        <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/5 rounded-full text-[9px] font-black uppercase tracking-widest text-green-500">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                            <span>Online</span>
                        </div>
                        <button 
                            onClick={onSignOut}
                            className="h-10 w-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-red-500/10 text-red-500 transition-all border border-white/5 hover:border-red-500/50"
                        >
                            <LogoutIcon className="w-5 h-5" />
                        </button>
                    </div>
                </header>
            </div>

            <div className="relative z-10 max-w-screen-xl mx-auto px-6 sm:px-8 md:px-12 pt-40">
                
                {/* Dashboard Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 animate-fade-in-up">
                    {[
                        { label: 'Total Candidates', value: users.length.toString(), icon: UserGroupIcon },
                        { label: 'Modules Completed', value: totalCompletions.toString(), icon: CheckIcon },
                        { label: 'Live Sessions', value: totalSessions.toString(), icon: ClockIcon },
                        { label: 'Active Today', value: isLoading ? '-' : users.length > 0 ? '1' : '0', icon: UserCircleIcon },
                    ].map((stat, idx) => (
                        <div key={idx} className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 shadow-2xl flex items-center justify-between group hover:bg-white/10 transition-all duration-500">
                            <div>
                                <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em] mb-2">{stat.label}</p>
                                <p className="text-4xl font-black text-white tracking-tighter">{stat.value}</p>
                            </div>
                            <div className="h-12 w-12 bg-white/5 rounded-2xl flex items-center justify-center text-white/40 group-hover:text-white transition-all duration-500 border border-white/5">
                                <stat.icon className="w-5 h-5" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Registered Candidates */}
                <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                    <div className="flex items-center justify-between mb-8 px-4">
                        <h2 className="text-2xl font-black text-white tracking-tight uppercase">Registered Candidates</h2>
                        <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">{users.length} Total</span>
                    </div>
                    
                    <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl">
                        <div className="hidden md:grid grid-cols-12 bg-white/5 px-10 py-6 text-[9px] font-black text-white/20 uppercase tracking-[0.4em] border-b border-white/10">
                            <div className="col-span-2">Identity</div>
                            <div className="col-span-4">Candidate Profile</div>
                            <div className="col-span-3">Application Ref</div>
                            <div className="col-span-2 text-center">Progress</div>
                            <div className="col-span-1"></div>
                        </div>

                        <div className="divide-y divide-white/5">
                            {isLoading ? (
                                <div className="p-20 text-center text-white/20 uppercase font-black tracking-widest text-[10px]">Syncing Data...</div>
                            ) : users.length === 0 ? (
                                <div className="p-20 text-center text-white/20 uppercase font-black tracking-widest text-[10px]">No Candidates Found</div>
                            ) : (
                                users.map((user) => (
                                    <button 
                                        key={user.id}
                                        onClick={() => onSelectCandidate(user.id)}
                                        className="w-full grid grid-cols-1 md:grid-cols-12 px-8 md:px-10 py-8 items-center hover:bg-white/[0.07] transition-all text-left group gap-6 md:gap-0"
                                    >
                                        <div className="col-span-2 text-[10px] font-mono font-black text-white/20 group-hover:text-white/40 transition-colors order-2 md:order-1">
                                            #{user.id.slice(0,8)}
                                        </div>
                                        <div className="col-span-4 order-1 md:order-2">
                                            <div className="flex items-center gap-5">
                                                <div className="h-14 w-14 rounded-2xl bg-white/10 text-white flex items-center justify-center text-lg font-black shadow-xl group-hover:scale-110 transition-transform">
                                                    {(user.name || 'C').charAt(0)}
                                                </div>
                                                <div>
                                                    <span className="text-lg font-black text-white tracking-tight block">{user.name}</span>
                                                    <span className="md:hidden text-[9px] font-black text-white/20 uppercase tracking-widest mt-2 block">{user.applicationNumber}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="hidden md:block col-span-3 text-xs font-black text-white/40 tracking-widest order-3">
                                            {user.applicationNumber}
                                        </div>
                                        <div className="col-span-2 text-center order-4">
                                            <span className="inline-flex items-center px-6 py-2 rounded-full text-[9px] font-black uppercase tracking-widest bg-white/5 text-white/60 border border-white/5 group-hover:border-white/30 group-hover:text-white transition-all">
                                                {(user.completedTechniques?.length || 0) + (user.customerSessions?.length || 0)} Activities
                                            </span>
                                        </div>
                                        <div className="col-span-1 text-right order-5">
                                            <ChevronRightIcon className="w-5 h-5 text-white/10 group-hover:text-white group-hover:translate-x-1 transition-all ml-auto" />
                                        </div>
                                    </button>
                                ))
                            )}
                        </div>
                    </div>
                </div>
                
                <div className="mt-24 text-center opacity-10">
                    <p className="text-[8px] font-black uppercase tracking-[1em] text-white">
                        Academy Admin Terminal • GenXReality
                    </p>
                </div>
             </div>
        </div>
    );
};

export default AdminPage;
