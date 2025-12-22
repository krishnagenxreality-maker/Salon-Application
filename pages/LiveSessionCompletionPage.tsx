
import React, { useState } from 'react';
import { ClockIcon, CheckIcon, UserCircleIcon, CalendarIcon, UserGroupIcon, PhotoIcon } from '../components/AppIcons';
import { SERVICE_STEP_MAPPING, DEFAULT_STEPS } from '../data/serviceSteps';
import { CustomerDetails, SessionImage } from '../types';

interface LiveSessionCompletionPageProps {
  serviceName: string;
  stepTimings: number[];
  customerDetails: CustomerDetails | null;
  sessionImages: SessionImage[];
  onBackToMenu: () => void;
  onNewCustomer: () => void;
}

const Confetti: React.FC = () => {
    return (
        <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
            {Array.from({ length: 40 }).map((_, i) => (
                <div
                    key={i}
                    className="confetti"
                    style={{
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 5}s`,
                        transform: `scale(${Math.random() * 0.5 + 0.5})`,
                        backgroundColor: i % 2 === 0 ? '#fff' : '#444'
                    }}
                />
            ))}
        </div>
    );
};

const formatTime = (ms: number) => {
  if (ms < 0) return '00:00';
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
};

const StarRating: React.FC = () => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    return (
        <div className="flex flex-col items-center mt-4">
            <div className="flex space-x-2">
                {[...Array(5)].map((_, index) => {
                    const ratingValue = index + 1;
                    const isActive = ratingValue <= (hover || rating);
                    return (
                        <button
                            key={index}
                            type="button"
                            className={`w-8 h-8 sm:w-10 sm:h-10 transition-all duration-300 transform ${
                                isActive ? "text-white scale-110 drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]" : "text-white/10 hover:text-white/30"
                            }`}
                            onClick={() => setRating(ratingValue)}
                            onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeave={() => setHover(rating)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                            </svg>
                        </button>
                    );
                })}
            </div>
            <p className="mt-3 text-[9px] text-white/40 font-black uppercase tracking-[0.3em]">
                {rating > 0 ? `${rating} Star Experience` : "Tap to rate session"}
            </p>
        </div>
    );
};

const LiveSessionCompletionPage: React.FC<LiveSessionCompletionPageProps> = ({ serviceName, stepTimings, customerDetails, sessionImages, onBackToMenu, onNewCustomer }) => {
  const totalTime = stepTimings.reduce((sum, time) => sum + time, 0);
  const steps = SERVICE_STEP_MAPPING[serviceName] || DEFAULT_STEPS;
  const targetDuration = customerDetails?.duration;

  return (
    <div className="fixed inset-0 w-full h-full bg-black flex flex-col items-center overflow-y-auto no-scrollbar animate-fade-in text-white selection:bg-white selection:text-black">
      
      {/* GLOSSY BLACK BACKGROUND SYSTEM */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,_#111111_0%,_#000000_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-40" />
        <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent_40%,rgba(255,255,255,0.02)_50%,transparent_60%)] animate-shimmer" />
      </div>

      <Confetti />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-32 pb-40">
        
        {/* Header Section */}
        <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/5 backdrop-blur-3xl border border-white/10 text-white mb-8 shadow-[0_0_50px_rgba(255,255,255,0.1)]">
                <CheckIcon className="w-10 h-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
            </div>
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-white tracking-tighter leading-none uppercase mb-4 drop-shadow-[0_0_40px_rgba(255,255,255,0.3)]">
                Session Complete
            </h1>
            <p className="text-[10px] sm:text-xs text-white/40 font-black uppercase tracking-[0.6em] mb-1">
                {serviceName}
            </p>
            <div className="w-16 h-[1px] bg-white/20 mx-auto mt-6" />
        </div>

        {/* Data Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
            
            {/* TIME ANALYSIS CARD */}
            <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 sm:p-12 shadow-2xl flex flex-col animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h2 className="text-[11px] font-black text-white uppercase tracking-[0.4em]">Time Analysis</h2>
                        <p className="text-[9px] text-white/30 font-bold uppercase tracking-widest mt-1">Step Performance</p>
                    </div>
                    <div className="flex items-center gap-3">
                         {targetDuration && targetDuration !== '0' && (
                            <span className="text-[9px] font-black text-white/20 border border-white/10 px-4 py-1.5 rounded-full uppercase tracking-widest">
                                TARGET: {targetDuration}M
                            </span>
                        )}
                        <ClockIcon className="w-5 h-5 text-white/20" />
                    </div>
                </div>
                
                <div className="space-y-6 max-h-[300px] overflow-y-auto no-scrollbar pr-2 mb-8 flex-grow">
                    {steps.map((step, index) => {
                        if (index >= stepTimings.length) return null;
                        return (
                            <div key={index} className="flex justify-between items-center group">
                                <div className="max-w-[70%]">
                                    <p className="font-bold text-white text-sm sm:text-base group-hover:translate-x-1 transition-transform">{step.title}</p>
                                    <p className="text-[9px] text-white/20 font-black uppercase tracking-widest mt-0.5">Step {index + 1}</p>
                                </div>
                                <p className="text-sm sm:text-base font-black text-white tabular-nums drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                                    {formatTime(stepTimings[index] || 0)}
                                </p>
                            </div>
                        );
                    })}
                </div>

                <div className="pt-10 border-t border-white/5 flex justify-between items-end">
                    <div>
                        <p className="text-[10px] text-white/30 font-black uppercase tracking-[0.3em] mb-1">Final Result</p>
                        <p className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">Total Duration</p>
                    </div>
                    <p className="text-4xl sm:text-5xl font-black text-white tabular-nums tracking-tighter drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]">
                        {formatTime(totalTime)}
                    </p>
                </div>
            </div>

            {/* CUSTOMER & REVIEW PANEL */}
            <div className="space-y-8 flex flex-col animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                
                {/* Customer Details Card */}
                <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 sm:p-10 shadow-2xl flex-1">
                     <div className="flex items-center gap-2 mb-10">
                        <UserCircleIcon className="w-4 h-4 text-white/20" />
                        <h2 className="text-[11px] font-black text-white uppercase tracking-[0.4em]">Customer Record</h2>
                     </div>
                     
                     {customerDetails && (
                        <div className="space-y-8">
                            <div>
                                <p className="text-[9px] text-white/30 font-black uppercase tracking-widest mb-2">Primary Client</p>
                                <p className="text-3xl sm:text-4xl font-black text-white tracking-tighter uppercase leading-none">{customerDetails.name}</p>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-10">
                                <div>
                                    <p className="text-[9px] text-white/30 font-black uppercase tracking-widest mb-1">Session Date</p>
                                    <p className="text-sm font-black text-white uppercase tracking-widest">{customerDetails.date}</p>
                                </div>
                                <div>
                                    <p className="text-[9px] text-white/30 font-black uppercase tracking-widest mb-1">Start Time</p>
                                    <p className="text-sm font-black text-white uppercase tracking-widest">{customerDetails.time}</p>
                                </div>
                            </div>

                            <div className="pt-8 border-t border-white/5 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <UserGroupIcon className="w-5 h-5 text-white/20" />
                                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-[0.2em] border ${customerDetails.isMember ? 'bg-white text-black border-white' : 'bg-white/5 text-white/40 border-white/10'}`}>
                                        {customerDetails.isMember ? 'MEMBER' : 'GUEST'}
                                    </span>
                                </div>
                                {customerDetails.isMember && (
                                    <span className="text-xs text-white/50 font-mono font-black tracking-widest">#{customerDetails.memberId}</span>
                                )}
                            </div>
                        </div>
                     )}
                </div>

                {/* Star Rating Component */}
                <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 shadow-2xl text-center">
                    <h3 className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em] mb-4">Post-Service Rating</h3>
                    <StarRating />
                </div>
            </div>
        </div>
        
        {/* Gallery Section */}
        {sessionImages.length > 0 && (
            <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-10 sm:p-14 shadow-2xl animate-fade-in-up mb-16" style={{ animationDelay: '0.3s' }}>
                <div className="flex items-center gap-4 mb-12">
                    <PhotoIcon className="w-6 h-6 text-white" />
                    <div>
                        <h2 className="text-[11px] font-black text-white uppercase tracking-[0.4em]">Visual Documentation</h2>
                        <p className="text-[9px] text-white/30 font-bold uppercase tracking-widest mt-1">Live Capture Gallery</p>
                    </div>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {sessionImages.map((img, idx) => (
                        <div key={idx} className="relative group rounded-3xl overflow-hidden border border-white/5 aspect-[3/4] bg-white/5 transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
                            <img src={img.imageUrl} alt={`Capture ${idx}`} className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-5">
                                <p className="text-[9px] text-white font-black uppercase tracking-[0.15em] mb-1 leading-tight">{img.stepTitle}</p>
                                <p className="text-[8px] text-white/40 font-bold uppercase tracking-widest">Capture 0{idx + 1}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {/* Action Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <button
            onClick={onNewCustomer}
            className="w-full sm:w-auto px-16 py-6 bg-white text-black text-[10px] font-black uppercase tracking-[0.3em] rounded-full shadow-[0_30px_60px_rgba(255,255,255,0.1)] hover:scale-105 active:scale-95 transition-all"
          >
            New Customer
          </button>
          <button
            onClick={onBackToMenu}
            className="w-full sm:w-auto px-16 py-6 bg-transparent border border-white/10 text-white/50 hover:text-white hover:bg-white/5 text-[10px] font-black uppercase tracking-[0.3em] rounded-full transition-all"
          >
            Back to Menu
          </button>
        </div> 

        <div className="mt-24 text-center opacity-10">
             <p className="text-[8px] font-black uppercase tracking-[1em]">
                GenXReality • Salon Precision Academy
             </p>
        </div>
      </div>

      <style>{`
        .confetti {
          position: absolute;
          width: 6px;
          height: 6px;
          opacity: 0.15;
          border-radius: 50%;
          animation: confetti-fall 6s linear infinite;
        }
        @keyframes confetti-fall {
          0% { transform: translateY(-100vh) rotate(0deg); opacity: 0.3; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(40px); filter: blur(15px); }
          100% { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .animate-shimmer {
          background-size: 200% 100%;
          animation: shimmer 12s linear infinite;
        }
        .animate-fade-in-up {
          animation: fade-in-up 1.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

export default LiveSessionCompletionPage;
