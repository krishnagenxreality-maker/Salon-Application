
import React from 'react';
import { CustomerSession } from '../types';
import { ChevronLeftIcon, LogoutIcon, PhotoIcon } from '../components/AppIcons';
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
            
            {/* CINEMATIC BACKGROUND */}
            <div className="fixed inset-0 z-0">
                <img 
                    src={DEFAULT_BG} 
                    alt="Background" 
                    className="w-full h-full object-cover opacity-20 scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black"></div>
            </div>

            {/* DARK PILL HEADER */}
            <div className="fixed top-6 left-1/2 -translate-x-1/2 w-[94%] max-w-7xl z-[100] animate-fade-in">
                <header className="h-16 flex items-center justify-between px-8 rounded-full bg-black/40 backdrop-blur-3xl border border-white/10 shadow-2xl">
                    <div className="flex-1 flex items-center">
                        <button 
                            onClick={(e) => { e.preventDefault(); onBack(); }}
                            className="flex items-center text-[9px] font-black uppercase tracking-[0.4em] text-white/40 hover:text-white transition-all group"
                        >
                            <ChevronLeftIcon className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
                            <span>Back</span>
                        </button>
                    </div>
                    <div className="flex-1 flex justify-center">
                        <img src="/images/logo.png" alt="GenXReality" className="h-10 w-auto brightness-0 invert opacity-100" />
                    </div>
                    <div className="flex-1 flex justify-end">
                        <button 
                            onClick={onSignOut}
                            className="h-10 w-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-red-500/10 text-red-500 transition-all border border-white/5 hover:border-red-500/50"
                        >
                            <LogoutIcon className="w-4 h-4" />
                        </button>
                    </div>
                </header>
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-12 pt-36">
                
                {/* HERO AREA: Cleaner Hierarchy */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 animate-fade-in-up">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="px-4 py-1.5 bg-white text-black rounded-full text-[8px] font-black uppercase tracking-widest">{session.subService}</span>
                            <span className="text-white/30 text-[8px] font-black uppercase tracking-[0.4em]">{new Date(session.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                        <h1 className="text-5xl sm:text-7xl font-black text-white tracking-tighter leading-none uppercase">Session<br/><span className="text-white/40">Report</span></h1>
                    </div>
                    
                    <div className="flex flex-col items-center md:items-end gap-3 pb-2">
                        <p className="text-[8px] text-white/30 uppercase tracking-[0.4em] font-black">Experience Rating</p>
                        <div className="flex gap-1.5 text-white text-2xl">
                            {[...Array(5)].map((_, i) => (
                                <span key={i} className={i < session.rating ? 'opacity-100 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]' : 'opacity-10'}>★</span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* MAIN GRID: Restructured for balance */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-20">
                    
                    {/* LEFT: Analysis & Protocol (5 cols) */}
                    <div className="lg:col-span-5 space-y-12 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        
                        <section>
                            <div className="flex items-center gap-3 mb-8">
                                <div className="h-px flex-1 bg-white/10"></div>
                                <h3 className="text-[9px] font-black text-white/30 uppercase tracking-[0.5em]">Analytics</h3>
                            </div>
                            
                            <div className="space-y-6">
                                {[
                                    { label: 'Full Name', value: session.customerDetails.name },
                                    { label: 'Arrival', value: session.customerDetails.time },
                                    { label: 'Status', value: session.customerDetails.isMember ? `MEMBER #${session.customerDetails.memberId}` : 'GUEST' }
                                ].map((item, idx) => (
                                    <div key={idx} className="flex justify-between items-center py-2 group">
                                        <span className="text-white/30 text-[9px] font-black uppercase tracking-widest">{item.label}</span>
                                        <span className="font-black text-white text-sm uppercase tracking-tight group-hover:text-silver transition-colors">{item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section>
                            <div className="flex items-center gap-3 mb-8">
                                <div className="h-px flex-1 bg-white/10"></div>
                                <h3 className="text-[9px] font-black text-white/30 uppercase tracking-[0.5em]">Consultation</h3>
                            </div>
                            <div className="p-8 bg-white/[0.03] border border-white/10 rounded-[2rem] relative group">
                                <div className="absolute top-4 left-6 text-3xl text-white/5 font-serif select-none">"</div>
                                <p className="text-sm font-medium leading-relaxed italic text-white/60 relative z-10">
                                    {session.customerRequest || "Initial consultation phase was focused on fundamental styling requirements without specific deviations recorded."}
                                </p>
                            </div>
                        </section>
                    </div>

                    {/* RIGHT: Timeline (7 cols) - Cleaned up scrollbar */}
                    <div className="lg:col-span-7 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        <div className="flex items-center gap-3 mb-8">
                            <h3 className="text-[9px] font-black text-white/30 uppercase tracking-[0.5em]">Execution Timeline</h3>
                            <div className="h-px flex-1 bg-white/10"></div>
                        </div>

                        <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-10 shadow-2xl overflow-hidden">
                            <div className="space-y-1 max-h-[480px] overflow-y-auto no-scrollbar pr-4">
                                {steps.map((step, index) => {
                                    if (index >= session.stepTimings.length) return null;
                                    return (
                                        <div key={index} className="flex justify-between items-center py-5 border-b border-white/5 last:border-0 group hover:bg-white/[0.01] px-2 -mx-2 transition-all">
                                            <div>
                                                <p className="font-black text-sm text-white uppercase tracking-widest leading-none group-hover:translate-x-1 transition-transform">{step.title}</p>
                                                <p className="text-[7px] text-white/20 font-black uppercase tracking-widest mt-2">Procedure Node {String(index + 1).padStart(2, '0')}</p>
                                            </div>
                                            <p className="text-lg font-mono font-black text-white tabular-nums">{formatTime(session.stepTimings[index])}</p>
                                        </div>
                                    );
                                })}
                            </div>
                            
                            <div className="mt-10 pt-10 border-t border-white/10 flex justify-between items-end">
                                <div>
                                    <p className="text-[8px] text-white/20 font-black uppercase tracking-[0.5em] mb-1">Total Clock Time</p>
                                    <p className="font-black text-2xl text-white uppercase tracking-tight">Finalized Session</p>
                                </div>
                                <span className="font-black text-5xl text-white tabular-nums tracking-tighter drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">{formatTime(totalTime)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* GALLERY: Documentation Log */}
                {session.images && session.images.length > 0 && (
                    <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                        <div className="flex items-center gap-4 mb-10">
                            <PhotoIcon className="w-5 h-5 text-white/20" />
                            <h2 className="text-[9px] font-black text-white/30 uppercase tracking-[0.5em]">Visual Evidence Log</h2>
                        </div>
                        
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
                            {session.images.map((img, idx) => (
                                <div key={idx} className="relative group rounded-[2rem] overflow-hidden aspect-[4/5] bg-white/5 border border-white/10 shadow-xl transition-all duration-700 hover:scale-[1.05] hover:z-20">
                                    <img src={img.imageUrl} alt={`Capture ${idx}`} className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 transition-all duration-1000" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-5 flex flex-col justify-end">
                                        <p className="text-white font-black text-[9px] uppercase tracking-widest mb-1 truncate">{img.stepTitle}</p>
                                        <p className="text-white/40 text-[7px] font-black uppercase tracking-widest">{new Date(img.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                
                <footer className="mt-32 pb-10 text-center opacity-10">
                    <p className="text-[8px] font-black uppercase tracking-[1em] text-white">
                        Academy Protocol Terminal • GenXReality
                    </p>
                </footer>
            </div>

            <style>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </div>
    );
};

export default AdminSessionDetailsPage;
