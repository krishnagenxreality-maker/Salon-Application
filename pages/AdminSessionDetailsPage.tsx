
import React from 'react';
import { CustomerSession } from '../types';
import { ChevronLeftIcon, UserCircleIcon, CalendarIcon, ClockIcon, UserGroupIcon, PhotoIcon } from '../components/AppIcons';
import { SERVICE_STEP_MAPPING, DEFAULT_STEPS } from '../data/serviceSteps';

interface AdminSessionDetailsPageProps {
    session: CustomerSession;
    onBack: () => void;
}

const formatTime = (ms: number) => {
    if (ms < 0) return '00:00';
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
};

const AdminSessionDetailsPage: React.FC<AdminSessionDetailsPageProps> = ({ session, onBack }) => {
    const totalTime = session.stepTimings.reduce((a, b) => a + b, 0);
    const steps = SERVICE_STEP_MAPPING[session.subService] || DEFAULT_STEPS;

    return (
        <div className="flex-1 flex flex-col bg-white pb-16 px-4 sm:px-6 md:px-8 lg:px-12 animate-fade-in">
            <div className="max-w-4xl mx-auto w-full">
                
                <div className="h-6 sm:h-10" />

                <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 sm:p-12 shadow-2xl mb-12">
                     <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 border-b border-gray-50 pb-10 gap-6">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <span className="px-4 py-1.5 bg-black text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em]">{session.subService}</span>
                                <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">{new Date(session.timestamp).toLocaleDateString()}</span>
                            </div>
                            <h1 className="text-4xl font-black text-black tracking-tighter leading-none">Session Report</h1>
                        </div>
                        <div className="text-left md:text-right">
                            <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-black mb-2">Customer Experience</p>
                            <div className="flex text-yellow-400 text-3xl">{[...Array(5)].map((_, i) => (<span key={i} className={i < session.rating ? 'opacity-100' : 'opacity-20'}>★</span>))}</div>
                        </div>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
                        <div className="space-y-10">
                            <div>
                                <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-6">Client Profile</h3>
                                <div className="bg-gray-50/50 p-6 rounded-3xl space-y-4 border border-gray-50 shadow-inner">
                                    <div className="flex justify-between border-b border-gray-100 pb-3"><span className="text-gray-500 text-sm font-medium">Name</span><span className="font-black text-black">{session.customerDetails.name}</span></div>
                                    <div className="flex justify-between border-b border-gray-100 pb-3"><span className="text-gray-500 text-sm font-medium">Scheduled</span><span className="font-black text-black">{session.customerDetails.time}</span></div>
                                    <div className="flex justify-between items-center"><span className="text-gray-500 text-sm font-medium">Tier</span><span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest ${session.customerDetails.isMember ? 'bg-black text-white' : 'bg-gray-200 text-gray-500'}`}>{session.customerDetails.isMember ? `MEMBER #${session.customerDetails.memberId}` : 'GUEST'}</span></div>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Consultation Records</h3>
                                <div className="p-6 bg-black text-white rounded-3xl"><p className="text-sm font-medium leading-relaxed italic opacity-80">"{session.customerRequest || "No consultation notes were recorded for this session."}"</p></div>
                            </div>
                        </div>
                        <div>
                             <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-6">Service Timeline</h3>
                             <div className="bg-gray-50/50 p-6 rounded-3xl border border-gray-50 shadow-inner max-h-[350px] overflow-y-auto custom-scrollbar">
                                <div className="space-y-4">
                                    {steps.map((step, index) => {
                                        if (index >= session.stepTimings.length) return null;
                                        return (
                                            <div key={index} className="flex justify-between items-center pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                                                <div className="max-w-[70%]"><p className="font-bold text-xs text-black uppercase tracking-tight">{step.title}</p></div>
                                                <p className="text-sm font-mono font-black text-black tabular-nums">{formatTime(session.stepTimings[index])}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between items-center">
                                    <span className="font-black text-xs text-gray-500 uppercase tracking-widest">Total Duration</span>
                                    <span className="font-black text-2xl text-black tabular-nums">{formatTime(totalTime)}</span>
                                </div>
                             </div>
                        </div>
                     </div>
                </div>

                {/* Gallery */}
                {session.images && session.images.length > 0 && (
                    <div className="animate-slide-up">
                        <h2 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em] mb-10">Visual Documentation</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                            {session.images.map((img, idx) => (
                                <div key={idx} className="relative group rounded-[2rem] overflow-hidden aspect-[3/4] bg-gray-100 shadow-xl">
                                    <img src={img.imageUrl} alt={`Session Image ${idx}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end">
                                        <p className="text-white font-black text-xs uppercase tracking-widest">{img.stepTitle}</p>
                                        <p className="text-gray-400 text-[10px] mt-2 font-bold uppercase">{new Date(img.timestamp).toLocaleTimeString()}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminSessionDetailsPage;
