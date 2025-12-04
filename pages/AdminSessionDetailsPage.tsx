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
    // Determine which step map to use based on service name
    const steps = SERVICE_STEP_MAPPING[session.subService] || DEFAULT_STEPS;

    return (
        <div className="w-full min-h-screen bg-white dark:bg-gray-900 pt-28 md:pt-32 pb-16 px-4 sm:px-6 md:px-8 lg:px-12 animate-fade-in transition-colors duration-300">
            <div className="max-w-4xl mx-auto">
                <button onClick={onBack} className="flex items-center text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors mb-6">
                    <ChevronLeftIcon className="w-5 h-5 mr-1" />
                    Back to Candidate Profile
                </button>

                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-6 sm:p-10 shadow-sm mb-8">
                     <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-gray-100 dark:border-gray-700 pb-6 gap-4">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className="px-3 py-1 bg-black text-white dark:bg-white dark:text-black rounded-full text-xs font-bold uppercase tracking-wider">
                                    {session.subService}
                                </span>
                                <span className="text-gray-500 dark:text-gray-400 text-sm">
                                    {new Date(session.timestamp).toLocaleDateString()}
                                </span>
                            </div>
                            <h1 className="text-3xl font-extrabold text-black dark:text-white tracking-tight">
                                Session Report
                            </h1>
                        </div>
                        <div className="text-right">
                             <p className="text-xs text-gray-400 uppercase tracking-wider font-bold">Customer Rating</p>
                             <div className="flex text-yellow-400 text-2xl">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className={i < session.rating ? 'opacity-100' : 'opacity-30'}>★</span>
                                ))}
                             </div>
                        </div>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                        {/* Column 1: Customer Info & Request */}
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-bold text-black dark:text-white mb-4 flex items-center gap-2">
                                    <UserCircleIcon className="w-5 h-5" /> Customer Profile
                                </h3>
                                <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-xl space-y-3">
                                    <div className="flex justify-between border-b border-gray-200 dark:border-gray-600 pb-2">
                                        <span className="text-gray-500 dark:text-gray-400 text-sm">Name</span>
                                        <span className="font-bold text-black dark:text-white">{session.customerDetails.name}</span>
                                    </div>
                                    <div className="flex justify-between border-b border-gray-200 dark:border-gray-600 pb-2">
                                        <span className="text-gray-500 dark:text-gray-400 text-sm">Time</span>
                                        <span className="font-bold text-black dark:text-white">{session.customerDetails.time}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-500 dark:text-gray-400 text-sm">Status</span>
                                        <span className={`px-2 py-0.5 rounded text-xs font-bold ${session.customerDetails.isMember ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}>
                                            {session.customerDetails.isMember ? `Member #${session.customerDetails.memberId}` : 'Guest'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-black dark:text-white mb-2">Consultation Notes</h3>
                                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-100 dark:border-yellow-800/30 rounded-xl">
                                    <p className="text-sm text-gray-700 dark:text-gray-300 italic">
                                        "{session.customerRequest || "No specific notes recorded."}"
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Column 2: Timings */}
                        <div>
                             <h3 className="text-lg font-bold text-black dark:text-white mb-4 flex items-center gap-2">
                                <ClockIcon className="w-5 h-5" /> Performance Timing
                            </h3>
                            <div className="space-y-3">
                                {session.stepTimings.map((time, idx) => (
                                    <div key={idx} className="flex justify-between items-center text-sm">
                                        <span className="text-gray-600 dark:text-gray-300 truncate pr-2">
                                            {steps[idx]?.title || `Step ${idx + 1}`}
                                        </span>
                                        <span className="font-mono font-medium text-black dark:text-white">
                                            {formatTime(time)}
                                        </span>
                                    </div>
                                ))}
                                <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-3 flex justify-between items-center">
                                    <span className="font-bold text-black dark:text-white">Total Duration</span>
                                    <span className="font-mono font-extrabold text-xl text-black dark:text-white">{formatTime(totalTime)}</span>
                                </div>
                            </div>
                        </div>
                     </div>
                </div>

                {/* Gallery Section */}
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-6 sm:p-10 shadow-sm">
                    <h3 className="text-xl font-bold text-black dark:text-white mb-6 flex items-center gap-2">
                        <PhotoIcon className="w-6 h-6" /> Session Gallery
                    </h3>
                    
                    {session.images && session.images.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {session.images.map((img, idx) => (
                                <div key={idx} className="relative group rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 aspect-[3/4]">
                                    <img src={img.imageUrl} alt={`Capture ${idx}`} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                                        <p className="text-xs text-white font-medium truncate w-full">{img.stepTitle}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                         <div className="text-center py-12 text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700/30 rounded-xl border border-dashed border-gray-200 dark:border-gray-600">
                             <PhotoIcon className="w-10 h-10 mx-auto mb-2 opacity-50" />
                             <p>No images captured during this session.</p>
                         </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminSessionDetailsPage;