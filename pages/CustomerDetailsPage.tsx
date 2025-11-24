
import React, { useState } from 'react';
import { ChevronLeftIcon, CalendarIcon, ClockIcon, UserCircleIcon, UserGroupIcon } from '../components/Icons';

interface CustomerDetailsPageProps {
  onNext: (details: { duration: string; isMember: boolean; memberId: string }) => void;
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
    
    // Validate Member ID if isMember is true
    if (isMember && !memberId.trim()) {
        alert("Please enter the Member ID.");
        return;
    }

    if (customerName && date && time && duration) {
        onNext({ 
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
            className="absolute top-28 left-8 md:left-12 z-50 flex items-center text-sm font-medium text-gray-500 hover:text-black transition-colors"
        >
            <ChevronLeftIcon className="w-5 h-5 mr-1" />
            Back
        </button>

      <div className="max-w-lg w-full">
        <div className="mb-10 text-center animate-slide-up">
             <h1 className="text-3xl md:text-4xl font-extrabold text-black tracking-tighter mb-2">
                Customer Details
             </h1>
             <p className="text-gray-500">
                Capture consultation data before starting the session.
             </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            
            {/* Customer Name */}
            <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Customer Name</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <UserCircleIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input 
                        type="text" 
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-black focus:border-black transition-colors placeholder-gray-400" 
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
                    <label className="block text-sm font-semibold text-gray-700">Date</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <CalendarIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input 
                            type="date" 
                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-black focus:border-black transition-colors" 
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                    </div>
                </div>

                {/* Time */}
                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Time</label>
                    <div className="relative">
                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <ClockIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input 
                            type="time" 
                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-black focus:border-black transition-colors" 
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            required
                        />
                    </div>
                </div>
            </div>

             {/* Duration */}
             <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Service Duration (Minutes)</label>
                <input 
                    type="text" 
                    className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-black focus:border-black transition-colors placeholder-gray-400" 
                    placeholder="Enter time (e.g., 60 or 0)"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    required
                />
            </div>

            {/* Membership Toggle */}
            <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Member?</label>
                <div className="flex gap-4">
                    <button
                        type="button"
                        onClick={() => setIsMember(true)}
                        className={`flex-1 py-3 px-4 rounded-xl border font-medium transition-all duration-200 ${
                            isMember 
                            ? 'bg-black text-white border-black shadow-md' 
                            : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                        }`}
                    >
                        Yes
                    </button>
                    <button
                        type="button"
                        onClick={() => { setIsMember(false); setMemberId(''); }}
                        className={`flex-1 py-3 px-4 rounded-xl border font-medium transition-all duration-200 ${
                            !isMember 
                            ? 'bg-black text-white border-black shadow-md' 
                            : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                        }`}
                    >
                        No
                    </button>
                </div>
            </div>

            {/* Member ID Input (Conditional) */}
            {isMember && (
                <div className="space-y-2 animate-slide-up">
                    <label className="block text-sm font-semibold text-gray-700">Member ID</label>
                    <div className="relative">
                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <UserGroupIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input 
                            type="text" 
                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-black focus:border-black transition-colors placeholder-gray-400" 
                            placeholder="Enter member ID"
                            value={memberId}
                            onChange={(e) => setMemberId(e.target.value)}
                            required={isMember}
                        />
                    </div>
                </div>
            )}

            <div className="pt-4">
                <button
                    type="submit"
                    className="w-full flex items-center justify-center py-4 px-8 bg-black text-white font-bold rounded-full hover:bg-gray-800 hover:scale-[1.02] transition-all duration-300 shadow-lg"
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
