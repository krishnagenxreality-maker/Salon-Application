
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
        <div className="w-full min-h-screen bg-white pt-28 md:pt-32 pb-16 px-4 sm:px-6 md:px-8 lg:px-12 animate-fade-in">
            <div className="max-w-4xl mx-auto">
                <button onClick={onBack} className="flex items-center text-sm font-medium text-gray-500 hover:text-black transition-colors mb-6">
                    <ChevronLeftIcon className="w-5 h-5 mr-1" />
                    Back to Candidate Profile
                </button>

                <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 shadow-sm mb-8">
                     <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-gray-100 pb-6 gap-4">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className="px-3 py-1 bg-black text-white rounded-full text-xs font-bold uppercase tracking-wider">{session.subService}</span>
                                <span className="text-gray-500 text-sm">{new Date(session.timestamp).toLocaleDateString()}</span>
                            </div>
                            <h1 className="text-3xl font-extrabold text-black tracking-tight">Session Report</h1>
                        </div>
                        <div className="text-right"><p className="text-xs text-gray-400 uppercase tracking-wider font-bold">Customer Rating</p><div className="flex text-yellow-400 text-2xl">{[...Array(5)].map((_, i) => (<span key={i} className={i < session.rating ? 'opacity-100' : 'opacity-30'}>★</span>))}</div></div>
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-bold text-black mb-4 flex items-center gap-2"><UserCircleIcon className="w-5 h-5" /> Customer Profile</h3>
                                <div className="bg-gray-50 p-4 rounded-xl space-y-3">
                                    <div className="flex justify-between border-b border-gray-200 pb-2"><span className="text-gray-500 text-sm">Name</span><span className="font-bold text-black">{session.customerDetails.name}</span></div>
                                    <div className="flex justify-between border-b border-gray-200 pb-2"><span className="text-gray-500 text-sm">Time</span><span className="font-bold text-black">{session.customerDetails.time}</span></div>
                                    <div className="flex justify-between items-center"><span className="text-gray-500 text-sm">Status</span><span className={`px-2 py-0.5 rounded text-xs font-bold ${session.customerDetails.isMember ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}>{session.customerDetails.isMember ? `Member #${session.customerDetails.memberId}` : 'Guest'}</span></div>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-black mb-2">Consultation Notes</h3>
                                <div className="p-4 bg-yellow-50 border border-yellow-100 rounded-xl"><p className="text-sm text-gray-700 italic">"{session.customerRequest || "No specific notes recorded."}"</p></div>
                            </div>
                        </div>
                        <div>
                             <h3 className="text-lg font-bold text-black mb-4 flex items-center gap-2"><ClockIcon className="w-5 h-5" /> Timeline</h3>
                             <div className="bg-gray-50 p-4 rounded-xl max-h-[300px] overflow-y-auto custom-scrollbar">
                                <div className="space-y-3">
                                    {steps.map((step, index) => {
                                        if (index >= session.stepTimings.length) return null;
                                        return (
                                            <div key={index} className="flex justify-between items-center pb-2 border-b border-gray-200 last:border-0 last:pb-0">
                                                <div className="max-w-[70%]"><p className="font-bold text-xs text-black">{step.title}</p></div>
                                                <p className="text-sm font-mono font-medium text-black tabular-nums">{formatTime(session.stepTimings[index])}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center"><span className="font-bold text-sm text-black">Total Duration</span><span className="font-bold text-lg text-black">{formatTime(totalTime)}</span></div>
                             </div>
                        </div>
                     </div>
                </div>

                {/* Gallery */}
                {session.images && session.images.length > 0 && (
                    <div className="animate-slide-up">
                        <h2 className="text-xl font-bold text-black mb-6 flex items-center gap-2"><PhotoIcon className="w-5 h-5" /> Session Gallery</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {session.images.map((img, idx) => (
                                <div key={idx} className="relative group rounded-xl overflow-hidden aspect-[3/4] bg-gray-100">
                                    <img src={img.imageUrl} alt={`Session Image ${idx}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end"><p className="text-white font-bold text-sm">{img.stepTitle}</p><p className="text-gray-300 text-xs">{new Date(img.timestamp).toLocaleTimeString()}</p></div>
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
