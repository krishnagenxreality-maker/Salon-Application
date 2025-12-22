
import React, { useState, useEffect } from 'react';
import { User, CustomerSession } from '../types';
import { api } from '../services/api';
import { ChevronLeftIcon, UserGroupIcon, MonitorIcon, CheckIcon, ChevronDownIcon, LogoutIcon } from '../components/AppIcons';
import { TECHNIQUES } from '../constants';

const DEFAULT_BG = '/images/auth-bg.jpeg';

interface AdminCandidateDetailsPageProps {
    candidateId: string;
    onBack: () => void;
    onSignOut: () => void;
    onSelectSession: (session: CustomerSession) => void;
}

const formatTime = (ms: number) => {
    if (ms < 0) return '00:00';
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
};

const AdminCandidateDetailsPage: React.FC<AdminCandidateDetailsPageProps> = ({ candidateId, onBack, onSignOut, onSelectSession }) => {
    const [user, setUser] = useState<User | undefined>(undefined);
    const [activeTab, setActiveTab] = useState<'training' | 'customer'>('training');
    const [expandedTechId, setExpandedTechId] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const u = await api.getUserById(candidateId);
            setUser(u);
        };
        fetchUser();
    }, [candidateId]);

    if (!user) return <div className="fixed inset-0 flex items-center justify-center bg-black text-white/20 font-black uppercase tracking-[0.5em] text-[10px]">Syncing Record...</div>;

    const completedTechniques = user.completedTechniques || [];
    const customerSessions = user.customerSessions || [];

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

            {/* DARK PILL HEADER - Restored size and enhanced blur */}
            <div className="fixed top-6 left-1/2 -translate-x-1/2 w-[94%] max-w-7xl z-[100] animate-fade-in">
                <header className="h-16 flex items-center justify-between px-8 rounded-full bg-black/40 backdrop-blur-3xl border border-white/10 shadow-2xl">
                    <div className="flex-1 flex items-center">
                        <button 
                            onClick={(e) => { e.preventDefault(); onBack(); }}
                            className="flex items-center text-[10px] font-black uppercase tracking-[0.4em] text-white/50 hover:text-white transition-all group"
                        >
                            <ChevronLeftIcon className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                            <span>Back</span>
                        </button>
                    </div>
                    <div className="flex-1 flex justify-center">
                        <img src="/images/logo.png" alt="Logo" className="h-10 w-auto brightness-0 invert opacity-100" />
                    </div>
                    <div className="flex-1 flex justify-end">
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
                
                {/* Profile Identity - Refined Sizes (Kept small as requested) */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6 animate-fade-in-up">
                    <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
                        <div className="h-20 w-20 bg-white/5 backdrop-blur-2xl text-white rounded-[1.5rem] flex items-center justify-center text-3xl font-black border border-white/10 shadow-2xl">
                            {(user.name || 'C').charAt(0)}
                        </div>
                        <div>
                            <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.5em] mb-2 block">Candidate Identity</span>
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tighter leading-none uppercase">{user.name}</h1>
                            <p className="text-white/30 font-mono text-[8px] mt-3 font-black uppercase tracking-[0.3em]">{user.applicationNumber} • Since {new Date(user.joinedAt).toLocaleDateString()}</p>
                        </div>
                    </div>
                    
                    {/* Tabs - Refined Padding (Kept small as requested) */}
                    <div className="flex p-1 bg-white/5 backdrop-blur-md rounded-[1.2rem] border border-white/10 w-full sm:w-auto shadow-2xl">
                        <button 
                            onClick={() => setActiveTab('training')}
                            className={`flex-1 sm:flex-none px-6 py-2.5 rounded-[0.9rem] text-[8px] font-black uppercase tracking-widest transition-all ${activeTab === 'training' ? 'bg-white text-black shadow-lg' : 'text-white/30 hover:text-white'}`}
                        >
                            <div className="flex items-center justify-center gap-2">
                                <MonitorIcon className="w-3 h-3" />
                                <span>Training</span>
                            </div>
                        </button>
                        <button 
                            onClick={() => setActiveTab('customer')}
                            className={`flex-1 sm:flex-none px-6 py-2.5 rounded-[0.9rem] text-[8px] font-black uppercase tracking-widest transition-all ${activeTab === 'customer' ? 'bg-white text-black shadow-lg' : 'text-white/30 hover:text-white'}`}
                        >
                            <div className="flex items-center justify-center gap-2">
                                <UserGroupIcon className="w-3 h-3" />
                                <span>Sessions</span>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Dashboard Stats - Refined font and padding (Kept small as requested) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                    <div className="bg-white/5 backdrop-blur-3xl p-8 rounded-[1.5rem] border border-white/10 shadow-xl flex flex-col justify-center min-h-[120px]">
                        <p className="text-[8px] text-white/20 uppercase tracking-[0.4em] font-black mb-2">Modules Mastered</p>
                        <p className="text-3xl lg:text-4xl font-black text-white tracking-tighter leading-none">{completedTechniques.length}</p>
                    </div>
                    <div className="bg-white/5 backdrop-blur-3xl p-8 rounded-[1.5rem] border border-white/10 shadow-xl flex flex-col justify-center min-h-[120px]">
                        <p className="text-[8px] text-white/20 uppercase tracking-[0.4em] font-black mb-2">Total Clock Time</p>
                        <p className="text-3xl lg:text-4xl font-black text-white tracking-tighter leading-none">
                            {formatTime(completedTechniques.reduce((acc, t) => acc + t.totalTime, 0))}
                        </p>
                    </div>
                </div>

                {/* Technique History */}
                {activeTab === 'training' && (
                    <div className="animate-fade-in-up">
                        <div className="mb-6 px-1">
                            <h3 className="text-xl font-black text-white tracking-tight uppercase">Technique History</h3>
                        </div>
                        <div className="space-y-3">
                            {completedTechniques.length === 0 ? (
                                <div className="p-16 text-center text-white/10 uppercase font-black tracking-widest text-[8px] bg-white/5 rounded-[2rem]">No Records Logged</div>
                            ) : (
                                completedTechniques.map((tech, idx) => {
                                    const isExpanded = expandedTechId === tech.techniqueId + idx;
                                    const originalTech = TECHNIQUES.find(t => t.id === tech.techniqueId);
                                    return (
                                        <div key={idx} className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[1.2rem] overflow-hidden shadow-xl group transition-all duration-500">
                                            <button 
                                                onClick={() => setExpandedTechId(isExpanded ? null : tech.techniqueId + idx)}
                                                className="w-full flex flex-col sm:flex-row items-center justify-between p-6 hover:bg-white/[0.05] transition-all gap-4 sm:gap-0"
                                            >
                                                <div className="flex items-center gap-4 w-full sm:w-auto">
                                                    <div className="h-10 w-10 bg-white/5 text-white/30 rounded-xl flex items-center justify-center border border-white/5 group-hover:text-white transition-colors">
                                                        <CheckIcon className="w-4 h-4" />
                                                    </div>
                                                    <div className="text-left">
                                                        <p className="font-black text-white text-base tracking-tight uppercase leading-none">{tech.techniqueTitle}</p>
                                                        <p className="text-[7px] text-white/20 font-black uppercase tracking-widest mt-1.5">{new Date(tech.completedAt).toLocaleDateString()}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between w-full sm:w-auto sm:gap-12">
                                                    <div className="text-left sm:text-right">
                                                        <p className="text-[7px] text-white/20 uppercase tracking-[0.3em] font-black mb-0.5">Time Elapsed</p>
                                                        <p className="font-mono font-black text-white text-lg tracking-tighter">{formatTime(tech.totalTime)}</p>
                                                    </div>
                                                    <ChevronDownIcon className={`w-4 h-4 text-white/10 transition-transform duration-500 ${isExpanded ? 'rotate-180 text-white' : ''}`} />
                                                </div>
                                            </button>
                                            {isExpanded && (
                                                <div className="bg-white/[0.02] border-t border-white/5 p-6 lg:p-8 animate-fade-in grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    {tech.stepTimings.map((time, stepIdx) => (
                                                        <div key={stepIdx} className="flex justify-between items-center py-2.5 border-b border-white/5">
                                                            <span className="text-[9px] font-black text-white/40 uppercase tracking-widest truncate pr-4">{originalTech?.steps[stepIdx]?.title || `Procedure ${stepIdx + 1}`}</span>
                                                            <span className="font-mono font-black text-white text-xs">{formatTime(time)}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>
                )}

                {/* Session Records */}
                {activeTab === 'customer' && (
                    <div className="animate-fade-in-up">
                        <div className="mb-6 px-1">
                            <h3 className="text-xl font-black text-white tracking-tight uppercase">Session Records</h3>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {customerSessions.length === 0 ? (
                                <div className="p-16 text-center text-white/10 uppercase font-black tracking-widest text-[8px] bg-white/5 rounded-[2rem] col-span-2">No Active Records</div>
                            ) : (
                                customerSessions.map((session) => (
                                    <button 
                                        key={session.id} 
                                        onClick={() => onSelectSession(session)} 
                                        className="group bg-white/5 backdrop-blur-3xl border border-white/10 p-6 rounded-[1.5rem] hover:bg-white/[0.08] hover:shadow-xl transition-all text-left"
                                    >
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="flex items-center gap-4">
                                                <div className="h-12 w-12 rounded-xl bg-white/5 text-white/20 group-hover:text-white flex items-center justify-center text-lg font-black transition-colors">
                                                    {(session.customerDetails.name || 'C').charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-black text-lg text-white tracking-tighter uppercase leading-none">{session.customerDetails.name}</p>
                                                    <p className="text-[7px] text-white/20 font-black uppercase tracking-widest mt-1">{new Date(session.timestamp).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                            <div className="flex text-white text-lg">
                                                {[...Array(5)].map((_, i) => <span key={i} className={i < session.rating ? 'opacity-100' : 'opacity-10'}>★</span>)}
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center text-[8px]">
                                                <span className="text-white/20 font-black uppercase tracking-widest">Division</span>
                                                <span className="font-black text-white uppercase tracking-widest">{session.serviceName}</span>
                                            </div>
                                            <div className="flex justify-between items-center text-[8px]">
                                                <span className="text-white/20 font-black uppercase tracking-widest">Protocol</span>
                                                <span className="font-black text-white uppercase tracking-widest">{session.subService}</span>
                                            </div>
                                            <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between">
                                                <span className="text-[8px] text-white/10 font-mono uppercase tracking-[0.2em]">Ref: {session.id.slice(0,8)}</span>
                                                <span className="text-[8px] font-black text-white/40 uppercase tracking-[0.4em] group-hover:text-white transition-colors">Details →</span>
                                            </div>
                                        </div>
                                    </button>
                                ))
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminCandidateDetailsPage;
