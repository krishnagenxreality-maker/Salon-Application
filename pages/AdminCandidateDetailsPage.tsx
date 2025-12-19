
import React, { useState, useEffect } from 'react';
import { User, CustomerSession } from '../types';
import { api } from '../services/api';
import { ChevronLeftIcon, UserGroupIcon, MonitorIcon, CheckIcon, ChevronDownIcon, ChevronUpIcon, UserCircleIcon } from '../components/AppIcons';
import { TECHNIQUES } from '../constants';

interface AdminCandidateDetailsPageProps {
    candidateId: string;
    onBack: () => void;
    onSelectSession: (session: CustomerSession) => void;
}

const formatTime = (ms: number) => {
    if (ms < 0) return '00:00';
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
};

const AdminCandidateDetailsPage: React.FC<AdminCandidateDetailsPageProps> = ({ candidateId, onBack, onSelectSession }) => {
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

    if (!user) return <div className="flex-1 flex items-center justify-center text-gray-400 font-bold uppercase tracking-widest">Loading Candidate...</div>;

    const completedTechniques = user.completedTechniques || [];
    const customerSessions = user.customerSessions || [];

    return (
        <div className="flex-1 flex flex-col bg-white pb-16 px-4 sm:px-6 md:px-8 lg:px-12 animate-fade-in">
            <div className="max-w-screen-xl mx-auto w-full">
                
                <div className="h-6 sm:h-10" />

                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 pb-8 border-b border-gray-100 gap-6">
                    <div className="flex items-center gap-6">
                        <div className="h-16 w-16 sm:h-20 sm:w-20 bg-black text-white rounded-3xl flex items-center justify-center text-3xl font-black">
                            {(user.name || 'C').charAt(0)}
                        </div>
                        <div>
                            <h1 className="text-2xl sm:text-4xl font-black text-black tracking-tighter leading-none">{user.name}</h1>
                            <p className="text-gray-400 font-mono text-xs mt-2 font-bold uppercase tracking-widest">{user.applicationNumber} • Joined {new Date(user.joinedAt).toLocaleDateString()}</p>
                        </div>
                    </div>
                    
                    <div className="flex gap-2 p-1.5 bg-gray-100 rounded-2xl">
                        <button 
                            onClick={() => setActiveTab('training')}
                            className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'training' ? 'bg-white text-black shadow-lg' : 'text-gray-400 hover:text-black'}`}
                        >
                            <div className="flex items-center gap-2">
                                <MonitorIcon className="w-4 h-4" />
                                Training
                            </div>
                        </button>
                        <button 
                            onClick={() => setActiveTab('customer')}
                            className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'customer' ? 'bg-white text-black shadow-lg' : 'text-gray-400 hover:text-black'}`}
                        >
                            <div className="flex items-center gap-2">
                                <UserGroupIcon className="w-4 h-4" />
                                Customers
                            </div>
                        </button>
                    </div>
                </div>

                {/* Training Phase Content */}
                {activeTab === 'training' && (
                    <div className="animate-slide-up">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                             <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-black">Modules Completed</p>
                                <p className="text-3xl font-black text-black mt-2">{completedTechniques.length}</p>
                             </div>
                             <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-black">Total Training Time</p>
                                <p className="text-3xl font-black text-black mt-2">
                                    {formatTime(completedTechniques.reduce((acc, t) => acc + t.totalTime, 0))}
                                </p>
                             </div>
                        </div>

                        <h3 className="text-xl font-black text-black mb-6 tracking-tight">Technique History</h3>
                        <div className="space-y-4">
                            {completedTechniques.length === 0 ? (
                                <p className="text-gray-400 font-medium italic">No techniques completed yet.</p>
                            ) : (
                                completedTechniques.map((tech, idx) => {
                                    const isExpanded = expandedTechId === tech.techniqueId + idx;
                                    const originalTech = TECHNIQUES.find(t => t.id === tech.techniqueId);
                                    return (
                                        <div key={idx} className="border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-sm transition-all">
                                            <button 
                                                onClick={() => setExpandedTechId(isExpanded ? null : tech.techniqueId + idx)}
                                                className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
                                            >
                                                <div className="flex items-center gap-5">
                                                    <div className="h-12 w-12 bg-black text-white rounded-full flex items-center justify-center">
                                                        <CheckIcon className="w-6 h-6" />
                                                    </div>
                                                    <div className="text-left">
                                                        <p className="font-black text-black text-lg tracking-tight">{tech.techniqueTitle}</p>
                                                        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Completed on {new Date(tech.completedAt).toLocaleDateString()}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-8">
                                                    <div className="text-right hidden sm:block">
                                                        <p className="text-[10px] text-gray-400 uppercase tracking-widest font-black">Duration</p>
                                                        <p className="font-mono font-black text-black text-lg">{formatTime(tech.totalTime)}</p>
                                                    </div>
                                                    {isExpanded ? <ChevronUpIcon className="w-5 h-5 text-black" /> : <ChevronDownIcon className="w-5 h-5 text-gray-300" />}
                                                </div>
                                            </button>
                                            {isExpanded && (
                                                <div className="bg-gray-50/50 border-t border-gray-50 p-8">
                                                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6">Step-by-Step Breakdown</h4>
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4">
                                                        {tech.stepTimings.map((time, stepIdx) => (
                                                            <div key={stepIdx} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
                                                                <span className="text-sm font-bold text-gray-600 truncate pr-4">{originalTech?.steps[stepIdx]?.title || `Step ${stepIdx + 1}`}</span>
                                                                <span className="font-mono font-black text-black">{formatTime(time)}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>
                )}

                {/* Customer Phase Content */}
                {activeTab === 'customer' && (
                    <div className="animate-slide-up">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-xl font-black text-black tracking-tight">Client Sessions</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {customerSessions.length === 0 ? (
                                <p className="text-gray-400 font-medium italic col-span-2">No customer sessions recorded yet.</p>
                            ) : (
                                customerSessions.map((session) => (
                                    <button key={session.id} onClick={() => onSelectSession(session)} className="group bg-white border border-gray-100 p-8 rounded-2xl hover:shadow-2xl hover:-translate-y-1 transition-all text-left">
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="flex items-center gap-4">
                                                <div className="h-12 w-12 rounded-full bg-gray-100 text-black flex items-center justify-center text-sm font-black">{(session.customerDetails.name || 'C').charAt(0)}</div>
                                                <div>
                                                    <p className="font-black text-lg text-black tracking-tight">{session.customerDetails.name}</p>
                                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">{new Date(session.timestamp).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                            <div className="flex text-yellow-400 text-lg">{[...Array(session.rating)].map((_, i) => <span key={i}>★</span>)}</div>
                                        </div>
                                        <div className="space-y-3">
                                            <div className="flex justify-between text-sm"><span className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Service</span><span className="font-black text-black">{session.serviceName}</span></div>
                                            <div className="flex justify-between text-sm"><span className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Technique</span><span className="font-black text-black">{session.subService}</span></div>
                                            <div className="pt-6 mt-6 border-t border-gray-50 flex items-center justify-between"><span className="text-[10px] text-gray-300 font-mono">ID: {session.id.slice(0,8)}</span><span className="text-[10px] font-black text-black uppercase tracking-widest group-hover:underline">View Report →</span></div>
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
