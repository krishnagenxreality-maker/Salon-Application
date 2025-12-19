
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
        <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 50 }).map((_, i) => (
                <div
                    key={i}
                    className="confetti"
                    style={{
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 5}s`,
                        transform: `scale(${Math.random() * 0.5 + 0.5})`,
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
        <div className="flex flex-col items-center mt-2 sm:mt-3">
            <div className="flex space-x-1 sm:space-x-2">
                {[...Array(5)].map((_, index) => {
                    const ratingValue = index + 1;
                    return (
                        <button
                            key={index}
                            type="button"
                            className={`w-7 h-7 sm:w-9 sm:h-9 transition-colors duration-200 ${
                                ratingValue <= (hover || rating) ? "text-yellow-400" : "text-gray-200"
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
            <p className="mt-2 text-[10px] text-gray-500 font-semibold uppercase tracking-widest">
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
    <div className="w-full min-h-screen bg-white flex flex-col items-center p-4 sm:p-6 pt-0 animate-fade-in confetti-container">
      <Confetti />
      <div className="max-w-4xl w-full">
        <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-green-50 text-green-500 mb-2 sm:mb-3 animate-slide-up">
                <CheckIcon className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black tracking-tight leading-none animate-slide-up" style={{ animationDelay: '0.1s' }}>
                Session Complete
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-gray-400 font-semibold uppercase tracking-widest animate-slide-up" style={{ animationDelay: '0.2s' }}>
                Service: <span className="text-black">{serviceName}</span>
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            
            {/* Left Col: Time Analysis */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-sm flex flex-col h-full">
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-50">
                    <h2 className="text-sm font-bold text-black tracking-widest uppercase text-[10px]">Time Analysis</h2>
                    <div className="flex items-center gap-2">
                        {targetDuration && targetDuration !== '0' && (
                            <div className="text-[10px] font-bold text-gray-400 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                                TARGET: {targetDuration}M
                            </div>
                        )}
                        <ClockIcon className="w-4 h-4 text-gray-300" />
                    </div>
                </div>
                
                <div className="space-y-4 max-h-[220px] overflow-y-auto pr-2 custom-scrollbar flex-grow">
                    {steps.map((step, index) => {
                        if (index >= stepTimings.length) return null;
                        
                        return (
                            <div key={index} className="flex justify-between items-center pb-1 border-b border-gray-50 last:border-0">
                                <div className="max-w-[70%]">
                                    <p className="font-semibold text-black text-xs sm:text-sm">{step.title}</p>
                                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Step {index + 1}</p>
                                </div>
                                <p className="text-sm font-mono font-semibold text-black tabular-nums">
                                    {formatTime(stepTimings[index] || 0)}
                                </p>
                            </div>
                        );
                    })}
                </div>

                <div className="flex justify-between items-center pt-4 mt-4 border-t border-gray-100">
                    <div>
                        <p className="text-base font-bold text-black">Total Time</p>
                        <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-widest">Actual Duration</p>
                    </div>
                    <p className="text-xl sm:text-2xl font-bold text-black tabular-nums">
                        {formatTime(totalTime)}
                    </p>
                </div>
            </div>

            {/* Right Col: Customer Details & Review */}
            <div className="flex flex-col gap-4">
                
                {/* Customer Card */}
                <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-sm">
                     <h2 className="text-sm font-bold text-black tracking-widest mb-4 pb-4 border-b border-gray-50 uppercase text-[10px]">Customer Details</h2>
                     
                     {customerDetails ? (
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <UserCircleIcon className="w-5 h-5 text-gray-300" />
                                <div>
                                    <p className="text-[9px] text-gray-400 font-semibold uppercase tracking-widest">Name</p>
                                    <p className="text-base font-bold text-black">{customerDetails.name}</p>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center gap-3">
                                    <CalendarIcon className="w-5 h-5 text-gray-300" />
                                    <div>
                                        <p className="text-[9px] text-gray-400 font-semibold uppercase tracking-widest">Date</p>
                                        <p className="text-xs font-semibold text-black">{customerDetails.date}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <ClockIcon className="w-5 h-5 text-gray-300" />
                                    <div>
                                        <p className="text-[9px] text-gray-400 font-semibold uppercase tracking-widest">Time</p>
                                        <p className="text-xs font-semibold text-black">{customerDetails.time}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 pt-1">
                                <UserGroupIcon className={`w-5 h-5 ${customerDetails.isMember ? 'text-black' : 'text-gray-200'}`} />
                                <div>
                                    <p className="text-[9px] text-gray-400 font-semibold uppercase tracking-widest">Status</p>
                                    <div className="flex items-center gap-2">
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-widest border ${customerDetails.isMember ? 'bg-black text-white border-black' : 'bg-gray-50 text-gray-400 border-gray-100'}`}>
                                            {customerDetails.isMember ? 'MEMBER' : 'GUEST'}
                                        </span>
                                        {customerDetails.isMember && (
                                            <span className="text-xs text-black font-mono font-semibold">#{customerDetails.memberId}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                     ) : (
                         <div className="text-center py-6 text-gray-400 font-bold uppercase text-[10px]">
                             <p>Profile Not Loaded</p>
                         </div>
                     )}
                </div>

                {/* Rating Card */}
                <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm text-center">
                    <h3 className="text-xs font-bold text-black uppercase tracking-widest">Customer Review</h3>
                    <StarRating />
                </div>
            </div>
        </div>
        
        {/* Gallery Section */}
        {sessionImages.length > 0 && (
            <div className="mt-6 bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-sm animate-slide-up" style={{ animationDelay: '0.4s' }}>
                <h2 className="text-sm font-bold text-black tracking-widest mb-6 flex items-center gap-2 uppercase text-[10px]">
                    <PhotoIcon className="w-4 h-4 text-black" />
                    Session Gallery
                </h2>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                    {sessionImages.map((img, idx) => (
                        <div key={idx} className="relative group rounded-xl overflow-hidden border border-gray-100 aspect-[3/4] bg-gray-50">
                            <img src={img.imageUrl} alt={`Capture ${idx}`} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                                <p className="text-[9px] text-white font-bold uppercase tracking-widest truncate w-full">{img.stepTitle}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 animate-slide-up pb-10" style={{ animationDelay: '0.6s' }}>
          <button
            onClick={onNewCustomer}
            className="bg-black text-white text-xs font-semibold uppercase tracking-[0.2em] px-10 py-4 w-full sm:w-auto hover:bg-gray-800 transition-all rounded-full shadow-lg hover:scale-105 active:scale-95"
          >
            New Customer
          </button>
          <button
            onClick={onBackToMenu}
            className="border-2 border-gray-100 text-gray-400 text-xs font-semibold uppercase tracking-[0.2em] px-10 py-4 w-full sm:w-auto hover:border-black hover:text-black transition-all rounded-full"
          >
            Back to Menu
          </button>
        </div> 
      </div>
    </div>
  );
};

export default LiveSessionCompletionPage;
