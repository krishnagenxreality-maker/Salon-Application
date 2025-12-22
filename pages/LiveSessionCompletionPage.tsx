import React, { useState } from 'react';
import { ClockIcon, CheckIcon, UserCircleIcon, CalendarIcon, UserGroupIcon, PlayIcon } from '../components/AppIcons';
import { SERVICE_STEP_MAPPING, DEFAULT_STEPS } from '../data/serviceSteps';
import { CustomerDetails } from '../types';

interface LiveSessionCompletionPageProps {
  serviceName: string;
  stepTimings: number[];
  customerDetails: CustomerDetails | null;
  sessionImages: any[]; // Kept for type compatibility
  videoUrl?: string; // Video from the session
  onBackToMenu: () => void;
  onNewCustomer: () => void;
}

const formatTime = (ms: number) => {
  if (ms < 0) return '00:00';
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
};

const LiveSessionCompletionPage: React.FC<LiveSessionCompletionPageProps> = ({ serviceName, stepTimings, customerDetails, videoUrl, onBackToMenu, onNewCustomer }) => {
  const totalTime = stepTimings.reduce((sum, time) => sum + time, 0);
  const steps = SERVICE_STEP_MAPPING[serviceName] || DEFAULT_STEPS;

  return (
    <div className="fixed inset-0 w-full h-full bg-black flex flex-col items-center overflow-y-auto no-scrollbar animate-fade-in text-white">
      
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,_#111111_0%,_#000000_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-40" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-32 pb-40">
        
        <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/5 backdrop-blur-3xl border border-white/10 text-white mb-8 shadow-[0_0_50px_rgba(255,255,255,0.1)]">
                <CheckIcon className="w-10 h-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
            </div>
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-white tracking-tighter leading-none uppercase mb-4">Session Complete</h1>
            <p className="text-[10px] sm:text-xs text-white/40 font-black uppercase tracking-[0.6em]">{serviceName}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
            
            {/* TIME ANALYSIS CARD */}
            <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 sm:p-12 shadow-2xl flex flex-col animate-fade-in-up">
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h2 className="text-[11px] font-black text-white uppercase tracking-[0.4em]">Time Analysis</h2>
                        <p className="text-[9px] text-white/30 font-bold uppercase tracking-widest mt-1">Step Performance</p>
                    </div>
                    <ClockIcon className="w-5 h-5 text-white/20" />
                </div>
                
                <div className="space-y-6 max-h-[300px] overflow-y-auto no-scrollbar pr-2 mb-8 flex-grow">
                    {steps.map((step, index) => {
                        if (index >= stepTimings.length) return null;
                        return (
                            <div key={index} className="flex justify-between items-center">
                                <div className="max-w-[70%]">
                                    <p className="font-bold text-white text-sm sm:text-base">{step.title}</p>
                                    <p className="text-[9px] text-white/20 font-black uppercase tracking-widest mt-0.5">Step {index + 1}</p>
                                </div>
                                <p className="text-sm sm:text-base font-black text-white tabular-nums">{formatTime(stepTimings[index] || 0)}</p>
                            </div>
                        );
                    })}
                </div>

                <div className="pt-10 border-t border-white/5 flex justify-between items-end">
                    <p className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">Total Duration</p>
                    <p className="text-4xl sm:text-5xl font-black text-white tabular-nums tracking-tighter">{formatTime(totalTime)}</p>
                </div>
            </div>

            {/* TIMELAPSE VIDEO CARD */}
            <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <div className="p-8 sm:p-10 border-b border-white/5">
                     <h2 className="text-[11px] font-black text-white uppercase tracking-[0.4em]">Session Timelapse</h2>
                     <p className="text-[9px] text-white/30 font-bold uppercase tracking-widest mt-1">Visual Evidence Log</p>
                </div>
                
                <div className="flex-1 bg-black relative group">
                    {videoUrl ? (
                        <video 
                            src={videoUrl} 
                            className="w-full h-full object-cover" 
                            controls 
                            autoPlay 
                            loop 
                        />
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-white/20">
                            <PlayIcon className="w-12 h-12 mb-4" />
                            <p className="text-[10px] font-black uppercase tracking-widest">Video Not Available</p>
                        </div>
                    )}
                </div>
            </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <button onClick={onNewCustomer} className="w-full sm:w-auto px-16 py-6 bg-white text-black text-[10px] font-black uppercase tracking-[0.3em] rounded-full shadow-2xl hover:scale-105 transition-all">New Customer</button>
          <button onClick={onBackToMenu} className="w-full sm:w-auto px-16 py-6 bg-transparent border border-white/10 text-white/50 hover:text-white rounded-full transition-all">Back to Menu</button>
        </div> 

        <div className="mt-24 text-center opacity-10">
             <p className="text-[8px] font-black uppercase tracking-[1em]">GenXReality • Salon Precision Academy</p>
        </div>
      </div>
    </div>
  );
};

export default LiveSessionCompletionPage;