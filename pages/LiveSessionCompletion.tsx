
import React from 'react';
import { ClockIcon, CheckIcon } from '../components/Icons';
import { SERVICE_STEP_MAPPING, DEFAULT_STEPS } from '../data/ServiceSteps';

interface LiveSessionCompletionPageProps {
  serviceName: string;
  stepTimings: number[];
  targetDuration: string;
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

const LiveSessionCompletionPage: React.FC<LiveSessionCompletionPageProps> = ({ serviceName, stepTimings, targetDuration, onBackToMenu, onNewCustomer }) => {
  const totalTime = stepTimings.reduce((sum, time) => sum + time, 0);

  // Look up steps to display correct titles
  const steps = SERVICE_STEP_MAPPING[serviceName] || DEFAULT_STEPS;

  return (
    <div className="w-full min-h-screen bg-white flex items-center justify-center text-center p-6 pt-20 animate-fade-in confetti-container">
      <Confetti />
      <div className="max-w-3xl w-full">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 text-green-600 mb-6 animate-slide-up">
            <CheckIcon className="w-10 h-10" />
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-black tracking-tighter leading-tight animate-slide-up" style={{ animationDelay: '0.1s' }}>
          Session Complete
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-gray-600 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          You have successfully completed the <span className="font-semibold text-black">{serviceName}</span> service.
        </p>

        <div className="bg-white border border-gray-200 rounded-3xl p-6 md:p-8 my-10 text-left animate-slide-up shadow-xl shadow-gray-100" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-black tracking-tight">Time Analysis</h2>
                <div className="flex items-center gap-4">
                    {targetDuration && targetDuration !== '0' && (
                         <div className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                            Target: {targetDuration} mins
                         </div>
                    )}
                     <ClockIcon className="w-5 h-5 text-gray-400" />
                </div>
            </div>
            
            <div className="space-y-4">
                {steps.map((step, index) => {
                    // Only show steps that were actually recorded (in case user finished early or steps mismatch)
                    if (index >= stepTimings.length) return null;
                    
                    return (
                        <div key={index} className="flex justify-between items-center pb-4 border-b border-gray-100 last:border-b-0 last:pb-0">
                            <div>
                                <p className="font-semibold text-black text-sm">{step.title}</p>
                                <p className="text-xs text-gray-400 uppercase tracking-wider mt-0.5">Step {index + 1}</p>
                            </div>
                            <p className="text-base font-mono font-medium text-gray-900 tabular-nums">
                                {formatTime(stepTimings[index] || 0)}
                            </p>
                        </div>
                    );
                })}
            </div>

            <div className="flex justify-between items-center pt-6 mt-6 border-t-2 border-gray-100">
                <div>
                    <p className="text-lg font-bold text-black">Total Service Time</p>
                    <p className="text-sm text-gray-500">Recorded duration</p>
                </div>
                <p className="text-2xl font-mono font-bold text-black tabular-nums">
                    {formatTime(totalTime)}
                </p>
            </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <button
            onClick={onNewCustomer}
            className="bg-black text-white text-sm font-bold tracking-wide uppercase px-8 py-4 w-full sm:w-auto hover:bg-gray-800 hover:scale-105 transition-all rounded-full shadow-lg"
          >
            New Customer
          </button>
          <button
            onClick={onBackToMenu}
            className="bg-white border border-gray-200 text-black text-sm font-bold tracking-wide uppercase px-8 py-4 w-full sm:w-auto hover:border-black hover:bg-gray-50 transition-all rounded-full"
          >
            Back to Menu
          </button>
        </div>
      </div>
    </div>
  );
};

export default LiveSessionCompletionPage;
