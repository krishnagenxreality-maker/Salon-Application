
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
    <div className="w-full min-h-screen bg-white flex items-center justify-center p-4 pt-20 animate-fade-in relative">
         {/* Back Button */}
         <button 
            onClick={onBack}
            className="absolute top-24 left-8 md:left-12 z-50 flex items-center text-sm font-medium text-gray-500 hover:text-black transition-colors"
        >
            <ChevronLeftIcon className="w-5 h-5 mr-1" />
            Back
        </button>

      <div className="max-w-lg w-full">
        <div className="mb-10 text-center animate-slide-up">
             <h1 className="text-4xl md:text-5xl font-extrabold text-black tracking-tighter mb-2">
                Customer Details
             </h1>
             <p className="text-gray-500">
                Customer requirements.
             </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            
            {/* Customer Name */}
            <div className="space-y-2">
                <label className="block text-sm font-semibold text-black">Customer Name</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <UserCircleIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input 
                        type="text" 
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all" 
                        placeholder="Enter client's full name"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        required
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {/* Date */}
                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-black">Date</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <CalendarIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input 
                            type="date" 
                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all" 
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                    </div>
                </div>

                {/* Time */}
                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-black">Time</label>
                    <div className="relative">
                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <ClockIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input 
                            type="time" 
                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all" 
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            required
                        />
                    </div>
                </div>
            </div>

             {/* Duration */}
             <div className="space-y-2">
                <label className="block text-sm font-semibold text-black">Service Duration (Minutes)</label>
                <input 
                    type="text" 
                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all" 
                    placeholder="Enter time (e.g., 60 or 0)"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    required
                />
            </div>

            {/* Membership Toggle */}
            <div className="space-y-2">
                <label className="block text-sm font-semibold text-black">Member?</label>
                <div className="flex gap-4">
                    <button
                        type="button"
                        onClick={() => setIsMember(true)}
                        className={`flex-1 py-3 px-4 rounded-lg border font-medium transition-all duration-200 ${
                            isMember 
                            ? 'bg-black text-white border-black' 
                            : 'bg-white text-gray-500 border-gray-300 hover:border-black'
                        }`}
                    >
                        Yes
                    </button>
                    <button
                        type="button"
                        onClick={() => { setIsMember(false); setMemberId(''); }}
                        className={`flex-1 py-3 px-4 rounded-lg border font-medium transition-all duration-200 ${
                            !isMember 
                            ? 'bg-black text-white border-black' 
                            : 'bg-white text-gray-500 border-gray-300 hover:border-black'
                        }`}
                    >
                        No
                    </button>
                </div>
            </div>

            {/* Member ID Input (Conditional) */}
            {isMember && (
                <div className="space-y-2 animate-slide-up">
                    <label className="block text-sm font-semibold text-black">Member ID</label>
                    <div className="relative">
                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <UserGroupIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input 
                            type="text" 
                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all" 
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
                    className="w-full flex items-center justify-center py-4 px-8 border border-transparent rounded-full shadow-lg text-base font-bold text-white bg-black hover:bg-gray-800 transition-colors"
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
