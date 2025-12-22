import React from 'react';
import { CustomerSession } from '../types';
import { ChevronLeftIcon, LogoutIcon, PlayIcon } from '../components/AppIcons';
import { SERVICE_STEP_MAPPING, DEFAULT_STEPS } from '../data/serviceSteps';

const DEFAULT_BG = '/images/auth-bg.jpeg';

interface AdminSessionDetailsPageProps {
    session: CustomerSession;
    onBack: () => void;
    onSignOut: () => void;
}

const formatTime = (ms: number) => {
    if (ms < 0) return '00:00';
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
};

const AdminSessionDetailsPage: React.FC<AdminSessionDetailsPageProps> = ({ session, onBack, onSignOut }) => {
    const totalTime = session.stepTimings.reduce((a, b) => a + b, 0);
    const steps = SERVICE_STEP_MAPPING[session.subService] || DEFAULT_STEPS;

    return (
        <div className="fixed inset-0 w-full h-full bg-black overflow-y-auto custom-scrollbar animate-fade-in pb-24">
            
            <div className="fixed inset-0 z-0">
                <img src={DEFAULT_BG} alt="Background" className="w-full h-full object-cover opacity-20 scale-105" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black"></div>
            </div>

            <div className="fixed top-6 left-1/2 -translate-x-1/2 w-[94%] max-w-7xl z-[100]">
                <header className="h-16 flex items-center justify-between px-8 rounded-full bg-black/40 backdrop-blur-3xl border border-white/10 shadow-2xl">
                    <button onClick={onBack} className="flex items-center text-[9px] font-black uppercase tracking-[0.4em] text-white/40 hover:text-white transition-all">
                        <ChevronLeftIcon className="w-4 h-4 mr-1" />
                        <span>Back</span>
                    </button>
                    <img src="/images/logo.png" alt="GenXReality" className="h-10 w-auto brightness-0 invert opacity-100" />
                    <button onClick={onSignOut} className="h-10 w-10 flex items-center justify-center rounded-full bg-white/5 text-red-500 border border-white/5"><LogoutIcon className="w-4 h-4" /></button>
                </header>
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-12 pt-36">
                
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 animate-fade-in-up">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="px-4 py-1.5 bg-white text-black rounded-full text-[8px] font-black uppercase tracking-widest">{session.subService}</span>
                            <span className="text-white/30 text-[8px] font-black uppercase tracking-[0.4em]">{new Date(session.timestamp).toLocaleDateString()}</span>
                        </div>
                        <h1 className="text-5xl sm:text-7xl font-black text-white tracking-tighter leading-none uppercase">Session<br/><span className="text-white/40">Report</span></h1>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-20">
                    <div className="lg:col-span-5 space-y-12 animate-fade-in-up">
                        <section>
                            <h3 className="text-[9px] font-black text-white/30 uppercase tracking-[0.5em] mb-8">Client Analytics</h3>
                            <div className="space-y-6">
                                <div className="flex justify-between items-center py-2 border-b border-white/5">
                                    <span className="text-white/30 text-[9px] font-black uppercase tracking-widest">Name</span>
                                    <span className="font-black text-white text-sm uppercase">{session.customerDetails.name}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-white/5">
                                    <span className="text-white/30 text-[9px] font-black uppercase tracking-widest">Status</span>
                                    <span className="font-black text-white text-sm uppercase">{session.customerDetails.isMember ? 'Member' : 'Guest'}</span>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div className="lg:col-span-7 animate-fade-in-up">
                        <h3 className="text-[9px] font-black text-white/30 uppercase tracking-[0.5em] mb-8">Session Video</h3>
                        <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl aspect-video relative">
                            {session.videoUrl ? (
                                <video src={session.videoUrl} className="w-full h-full object-cover" controls autoPlay loop />
                            ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center text-white/10">
                                    <PlayIcon className="w-12 h-12 mb-4" />
                                    <p className="text-[10px] font-black tracking-widest uppercase">Video Record Missing</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminSessionDetailsPage;