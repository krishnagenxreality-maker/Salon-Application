
import React, { useState } from 'react';
import { ChevronLeftIcon, CalendarIcon, ClockIcon, UserCircleIcon, UserGroupIcon } from '../components/AppIcons';
import { CustomerDetails } from '../types';

interface CustomerDetailsPageProps {
  onNext: (details: CustomerDetails) => void;
  onBack: () => void;
}

const CustomerDetailsPage: React.FC<CustomerDetailsPageProps> = ({ onNext, onBack }) => {
  const [customerName, setCustomerName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState(''); 
  const [isMember, setIsMember] = useState(false);
  const [memberId, setMemberId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isMember && !memberId.trim()) {
        alert("Please enter the Member ID.");
        return;
    }

    if (customerName && date && time && duration) {
        onNext({ 
            name: customerName,
            date,
            time,
            duration, 
            isMember, 
            memberId: isMember ? memberId : '' 
        });
    } else {
        alert("Please fill in all details.");
    }
  };

  return (
    <div className="w-full min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center p-4 pt-28 md:pt-32 animate-fade-in relative transition-colors duration-300">
         {/* Back Button */}
         <div className="absolute top-28 md:top-32 left-4 sm:left-12 z-50">
             <button 
                onClick={onBack}
                className="flex items-center text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
            >
                <ChevronLeftIcon className="w-5 h-5 mr-1" />
                Back
            </button>
         </div>

      <div className="max-w-lg w-full mt-8 sm:mt-0">
        <div className="mb-8 sm:mb-10 text-center animate-slide-up">
             <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-black dark:text-white tracking-tighter mb-2">
                Customer Details
             </h1>
             <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
                Customer requirements.
             </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            
            {/* Customer Name */}
            <div className="space-y-1 sm:space-y-2">
                <label className="block text-sm font-semibold text-black dark:text-gray-200">Customer Name</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <UserCircleIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input 
                        type="text" 
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-all text-sm sm:text-base" 
                        placeholder="Enter client's full name"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        required
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Date */}
                <div className="space-y-1 sm:space-y-2">
                    <label className="block text-sm font-semibold text-black dark:text-gray-200">Date</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <CalendarIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input 
                            type="date" 
                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-all text-sm sm:text-base" 
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                    </div>
                </div>

                {/* Time */}
                <div className="space-y-1 sm:space-y-2">
                    <label className="block text-sm font-semibold text-black dark:text-gray-200">Time</label>
                    <div className="relative">
                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <ClockIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input 
                            type="time" 
                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-all text-sm sm:text-base" 
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            required
                        />
                    </div>
                </div>
            </div>

             {/* Duration */}
             <div className="space-y-1 sm:space-y-2">
                <label className="block text-sm font-semibold text-black dark:text-gray-200">Service Duration (Minutes)</label>
                <input 
                    type="text" 
                    className="block w-full px-4 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-all text-sm sm:text-base" 
                    placeholder="Enter time (e.g., 60 or 0)"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    required
                />
            </div>

            {/* Membership Toggle */}
            <div className="space-y-1 sm:space-y-2">
                <label className="block text-sm font-semibold text-black dark:text-gray-200">Member?</label>
                <div className="flex gap-4">
                    <button
                        type="button"
                        onClick={() => setIsMember(true)}
                        className={`flex-1 py-3 px-4 rounded-lg border font-medium transition-all duration-200 text-sm sm:text-base ${
                            isMember 
                            ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white' 
                            : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-300 dark:border-gray-700 hover:border-black dark:hover:border-white'
                        }`}
                    >
                        Yes
                    </button>
                    <button
                        type="button"
                        onClick={() => { setIsMember(false); setMemberId(''); }}
                        className={`flex-1 py-3 px-4 rounded-lg border font-medium transition-all duration-200 text-sm sm:text-base ${
                            !isMember 
                            ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white' 
                            : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-300 dark:border-gray-700 hover:border-black dark:hover:border-white'
                        }`}
                    >
                        No
                    </button>
                </div>
            </div>

            {/* Member ID Input (Conditional) */}
            {isMember && (
                <div className="space-y-1 sm:space-y-2 animate-slide-up">
                    <label className="block text-sm font-semibold text-black dark:text-gray-200">Member ID</label>
                    <div className="relative">
                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <UserGroupIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input 
                            type="text" 
                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-all text-sm sm:text-base" 
                            placeholder="Enter member ID"
                            value={memberId}
                            onChange={(e) => setMemberId(e.target.value)}
                            required={isMember}
                        />
                    </div>
                </div>
            )}

            <div className="pt-6">
                <button
                    type="submit"
                    className="w-full flex items-center justify-center py-3 sm:py-4 px-8 border border-transparent rounded-full shadow-lg text-sm sm:text-base font-bold text-white bg-black dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                >
                    Select Service
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerDetailsPage;
