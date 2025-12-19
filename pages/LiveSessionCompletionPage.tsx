
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
        <div className="flex flex-col items-center mt-4 sm:mt-6">
            <div className="flex space-x-1 sm:space-x-2">
                {[...Array(5)].map((_, index) => {
                    const ratingValue = index + 1;
                    return (
                        <button
                            key={index}
                            type="button"
                            className={`w-8 h-8 sm:w-10 sm:h-10 transition-colors duration-200 ${
                                ratingValue <= (hover || rating) ? "text-yellow-400" : "text-gray-300"
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
            <p className="mt-2 text-xs sm:text-sm text-gray-500 font-medium">
                {rating > 0 ? `Client rated: ${rating} Stars` : "Tap a star to rate"}
            </p>
        </div>
    );
};

const LiveSessionCompletionPage: React.FC<LiveSessionCompletionPageProps> = ({ serviceName, stepTimings, customerDetails, sessionImages, onBackToMenu, onNewCustomer }) => {
  const totalTime = stepTimings.reduce((sum, time) => sum + time, 0);
  const steps = SERVICE_STEP_MAPPING[serviceName] || DEFAULT_STEPS;
  const targetDuration = customerDetails?.duration;

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center p-4 sm:p-6 pt-32 md:pt-40 animate-fade-in confetti-container">
      <Confetti />
      <div className="max-w-4xl w-full">
        <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-green-100 text-green-600 mb-4 sm:mb-6 animate-slide-up">
                <CheckIcon className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-black tracking-tighter leading-tight animate-slide-up" style={{ animationDelay: '0.1s' }}>
                Session Complete
            </h1>
            <p className="mt-2 text-base sm:text-lg text-gray-600 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                Service: <span className="font-bold text-black">{serviceName}</span>
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            
            {/* Left Col: Time Analysis */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm flex flex-col h-full">
                <div className="flex items-center justify-between mb-4 sm:mb-6 pb-4 border-b border-gray-100">
                    <h2 className="text-lg sm:text-xl font-bold text-black tracking-tight">Time Analysis</h2>
                    <div className="flex items-center gap-2">
                        {targetDuration && targetDuration !== '0' && (
                            <div className="text-[10px] sm:text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                                Target: {targetDuration} mins
                            </div>
                        )}
                        <ClockIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                    </div>
                </div>
                
                <div className="space-y-3 sm:space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar flex-grow">
                    {steps.map((step, index) => {
                        if (index >= stepTimings.length) return null;
                        
                        return (
                            <div key={index} className="flex justify-between items-center pb-2">
                                <div className="max-w-[70%]">
                                    <p className="font-semibold text-black text-xs sm:text-sm">{step.title}</p>
                                    <p className="text-[10px] text-gray-400 uppercase tracking-wider">Step {index + 1}</p>
                                </div>
                                <p className="text-sm sm:text-base font-mono font-medium text-black tabular-nums">
                                    {formatTime(stepTimings[index] || 0)}
                                </p>
                            </div>
                        );
                    })}
                </div>

                <div className="flex justify-between items-center pt-6 mt-6 border-t border-gray-200">
                    <div>
                        <p className="text-base sm:text-lg font-bold text-black">Total Time</p>
                        <p className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wide">Actual Duration</p>
                    </div>
                    <p className="text-2xl sm:text-3xl font-extrabold text-black tabular-nums">
                        {formatTime(totalTime)}
                    </p>
                </div>
            </div>

            {/* Right Col: Customer Details & Review */}
            <div className="flex flex-col gap-4 sm:gap-6">
                
                {/* Customer Card */}
                <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm">
                     <h2 className="text-lg sm:text-xl font-bold text-black tracking-tight mb-4 sm:mb-6 pb-4 border-b border-gray-100">Customer Details</h2>
                     
                     {customerDetails ? (
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <UserCircleIcon className="w-6 h-6 text-gray-400" />
                                <div>
                                    <p className="text-xs text-gray-400 uppercase tracking-wider">Name</p>
                                    <p className="text-base sm:text-lg font-bold text-black">{customerDetails.name}</p>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center gap-3">
                                    <CalendarIcon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
                                    <div>
                                        <p className="text-xs text-gray-400 uppercase tracking-wider">Date</p>
                                        <p className="text-sm sm:text-base font-medium text-black">{customerDetails.date}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <ClockIcon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
                                    <div>
                                        <p className="text-xs text-gray-400 uppercase tracking-wider">Time</p>
                                        <p className="text-sm sm:text-base font-medium text-black">{customerDetails.time}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 pt-2">
                                <UserGroupIcon className={`w-5 h-5 sm:w-6 sm:h-6 ${customerDetails.isMember ? 'text-black' : 'text-gray-300'}`} />
                                <div>
                                    <p className="text-xs text-gray-400 uppercase tracking-wider">Membership</p>
                                    <div className="flex items-center gap-2">
                                        <span className={`px-2 py-0.5 rounded text-xs font-bold ${customerDetails.isMember ? 'bg-black text-white' : 'bg-gray-100 text-gray-500'}`}>
                                            {customerDetails.isMember ? 'MEMBER' : 'GUEST'}
                                        </span>
                                        {customerDetails.isMember && (
                                            <span className="text-xs sm:text-sm text-black font-mono">#{customerDetails.memberId}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                     ) : (
                         <div className="text-center py-8 text-gray-400">
                             <p>No customer details provided.</p>
                         </div>
                     )}
                </div>

                {/* Rating Card */}
                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm text-center">
                    <h3 className="text-lg font-bold text-black">Customer Review</h3>
                    <p className="text-sm text-gray-500">Rate the service provided by the candidate</p>
                    <StarRating />
                </div>
            </div>
        </div>
        
        {/* Gallery Section */}
        {sessionImages.length > 0 && (
            <div className="mt-8 bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm animate-slide-up" style={{ animationDelay: '0.4s' }}>
                <h2 className="text-lg sm:text-xl font-bold text-black tracking-tight mb-6 flex items-center gap-2">
                    <PhotoIcon className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
                    Session Gallery
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {sessionImages.map((img, idx) => (
                        <div key={idx} className="relative group rounded-lg overflow-hidden border border-gray-200 aspect-[3/4]">
                            <img src={img.imageUrl} alt={`Capture ${idx}`} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                                <p className="text-xs text-white font-medium truncate w-full">{img.stepTitle}</p>
                            </div>
                            <div className="absolute top-2 right-2 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded">
                                #{idx + 1}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 sm:mt-12 animate-slide-up pb-8" style={{ animationDelay: '0.6s' }}>
          <button
            onClick={onNewCustomer}
            className="bg-black text-white text-sm font-semibold tracking-wide uppercase px-8 py-3 sm:px-10 sm:py-4 w-full sm:w-auto hover:bg-gray-800 transition-colors rounded-full shadow-lg"
          >
            New Customer
          </button>
          <button
            onClick={onBackToMenu}
            className="border border-gray-300 text-black text-sm font-semibold tracking-wide uppercase px-8 py-3 sm:px-10 sm:py-4 w-full sm:w-auto hover:border-black transition-colors rounded-full"
          >
            Back to Menu
          </button>
        </div> 
      </div>
    </div>
  );
};

export default LiveSessionCompletionPage;
