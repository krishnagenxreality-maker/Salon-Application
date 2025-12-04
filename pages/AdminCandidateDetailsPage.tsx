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

    if (!user) return <div className="pt-40 text-center dark:text-white">Loading candidate details...</div>;

    const completedTechniques = user.completedTechniques || [];
    const customerSessions = user.customerSessions || [];

    return (
        <div className="w-full min-h-screen bg-white dark:bg-gray-900 pt-28 md:pt-32 pb-16 px-4 sm:px-6 md:px-8 lg:px-12 animate-fade-in transition-colors duration-300">
            <div className="max-w-screen-xl mx-auto">
                {/* Back & Header */}
                <button onClick={onBack} className="flex items-center text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors mb-6">
                    <ChevronLeftIcon className="w-5 h-5 mr-1" />
                    Back to Dashboard
                </button>

                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 pb-8 border-b border-gray-200 dark:border-gray-800 gap-6">
                    <div className="flex items-center gap-4">
                        <div className="h-16 w-16 sm:h-20 sm:w-20 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center text-2xl font-bold">
                            {(user.name || 'C').charAt(0)}
                        </div>
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-extrabold text-black dark:text-white tracking-tight">{user.name}</h1>
                            <p className="text-gray-500 dark:text-gray-400 font-mono text-sm">{user.applicationNumber} • Joined {new Date(user.joinedAt).toLocaleDateString()}</p>
                        </div>
                    </div>
                    
                    <div className="flex gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
                        <button 
                            onClick={() => setActiveTab('training')}
                            className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${activeTab === 'training' ? 'bg-white dark:bg-gray-700 text-black dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'}`}
                        >
                            <div className="flex items-center gap-2">
                                <MonitorIcon className="w-4 h-4" />
                                Training Phase
                            </div>
                        </button>
                        <button 
                            onClick={() => setActiveTab('customer')}
                            className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${activeTab === 'customer' ? 'bg-white dark:bg-gray-700 text-black dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'}`}
                        >
                            <div className="flex items-center gap-2">
                                <UserGroupIcon className="w-4 h-4" />
                                Customer Phase
                            </div>
                        </button>
                    </div>
                </div>

                {/* Training Phase Content */}
                {activeTab === 'training' && (
                    <div className="animate-slide-up">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                             <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700">
                                <p className="text-xs text-gray-400 uppercase tracking-wider font-bold">Modules Completed</p>
                                <p className="text-3xl font-extrabold text-black dark:text-white mt-1">{completedTechniques.length}</p>
                             </div>
                             <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700">
                                <p className="text-xs text-gray-400 uppercase tracking-wider font-bold">Total Training Time</p>
                                <p className="text-3xl font-extrabold text-black dark:text-white mt-1">
                                    {formatTime(completedTechniques.reduce((acc, t) => acc + t.totalTime, 0))}
                                </p>
                             </div>
                        </div>

                        <h3 className="text-lg font-bold text-black dark:text-white mb-4">Technique History</h3>
                        <div className="space-y-4">
                            {completedTechniques.length === 0 ? (
                                <p className="text-gray-500 italic">No techniques completed yet.</p>
                            ) : (
                                completedTechniques.map((tech, idx) => {
                                    const isExpanded = expandedTechId === tech.techniqueId + idx;
                                    // Find original technique to get step names
                                    const originalTech = TECHNIQUES.find(t => t.id === tech.techniqueId);
                                    
                                    return (
                                        <div key={idx} className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-800">
                                            <button 
                                                onClick={() => setExpandedTechId(isExpanded ? null : tech.techniqueId + idx)}
                                                className="w-full flex items-center justify-between p-4 sm:p-6 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="h-10 w-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400">
                                                        <CheckIcon className="w-5 h-5" />
                                                    </div>
                                                    <div className="text-left">
                                                        <p className="font-bold text-black dark:text-white text-lg">{tech.techniqueTitle}</p>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400">Completed on {new Date(tech.completedAt).toLocaleDateString()}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-6">
                                                    <div className="text-right hidden sm:block">
                                                        <p className="text-xs text-gray-400 uppercase tracking-wide">Duration</p>
                                                        <p className="font-mono font-bold text-black dark:text-white">{formatTime(tech.totalTime)}</p>
                                                    </div>
                                                    {isExpanded ? <ChevronUpIcon className="w-5 h-5" /> : <ChevronDownIcon className="w-5 h-5" />}
                                                </div>
                                            </button>

                                            {isExpanded && (
                                                <div className="bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-700 p-6">
                                                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Step-by-Step Breakdown</h4>
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                                                        {tech.stepTimings.map((time, stepIdx) => (
                                                            <div key={stepIdx} className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700 last:border-0">
                                                                <span className="text-sm text-gray-600 dark:text-gray-300 truncate pr-4">
                                                                    {originalTech?.steps[stepIdx]?.title || `Step ${stepIdx + 1}`}
                                                                </span>
                                                                <span className="font-mono font-medium text-black dark:text-white">{formatTime(time)}</span>
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
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-black dark:text-white">Client Sessions</h3>
                            <span className="text-sm font-medium bg-black text-white dark:bg-white dark:text-black px-3 py-1 rounded-full">
                                {customerSessions.length} Sessions
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {customerSessions.length === 0 ? (
                                <p className="text-gray-500 italic col-span-2">No customer sessions recorded yet.</p>
                            ) : (
                                customerSessions.map((session) => (
                                    <button 
                                        key={session.id}
                                        onClick={() => onSelectSession(session)}
                                        className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all text-left"
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex items-center gap-3">
                                                <UserCircleIcon className="w-10 h-10 text-gray-300 dark:text-gray-600" />
                                                <div>
                                                    <p className="font-bold text-lg text-black dark:text-white">{session.customerDetails.name}</p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">{new Date(session.timestamp).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                            <div className="flex text-yellow-400 text-xs">
                                                {[...Array(session.rating)].map((_, i) => <span key={i}>★</span>)}
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-500 dark:text-gray-400">Service:</span>
                                                <span className="font-semibold text-black dark:text-white">{session.serviceName}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-500 dark:text-gray-400">Sub-Service:</span>
                                                <span className="font-semibold text-black dark:text-white">{session.subService}</span>
                                            </div>
                                            <div className="pt-3 mt-3 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                                                <span className="text-xs text-gray-400 font-mono">ID: {session.id}</span>
                                                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:underline">View Details →</span>
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