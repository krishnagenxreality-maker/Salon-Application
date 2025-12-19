
import React, { useState, useEffect } from 'react';
import { ChevronLeftIcon, CalendarIcon, ClockIcon, UserCircleIcon, UserGroupIcon, ChevronDownIcon } from '../components/AppIcons';
import { CustomerDetails } from '../types';

interface CustomerDetailsPageProps {
  onNext: (details: CustomerDetails) => void;
  onBack: () => void;
}

const CustomerDetailsPage: React.FC<CustomerDetailsPageProps> = ({ onNext, onBack }) => {
  const [customerName, setCustomerName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState('0'); // Default to 0
  const [isMember, setIsMember] = useState(false);
  const [memberId, setMemberId] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);

  // Auto-fill Date and Time on mount
  useEffect(() => {
    const now = new Date();
    
    // Format Date: YYYY-MM-DD
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    setDate(`${yyyy}-${mm}-${dd}`);

    // Format Time: HH:MM
    const hh = String(now.getHours()).padStart(2, '0');
    const min = String(now.getMinutes()).padStart(2, '0');
    setTime(`${hh}:${min}`);
  }, []);

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
    <div className="w-full min-h-screen bg-white flex items-center justify-center p-4 animate-fade-in relative">
      <div className="max-w-lg w-full">
        <div className="mb-8 sm:mb-10 text-center animate-slide-up">
             <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-black tracking-tighter mb-2">
                Customer Details
             </h1>
             <p className="text-gray-500 text-sm sm:text-base">
                Customer requirements.
             </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            
            {/* Customer Name */}
            <div className="space-y-1 sm:space-y-2">
                <label className="block text-sm font-semibold text-black">Customer Name</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <UserCircleIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input 
                        type="text" 
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 bg-white rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all text-sm sm:text-base" 
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
                    <label className="block text-sm font-semibold text-black">Date</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <CalendarIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input 
                            type="date" 
                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 bg-white rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all text-sm sm:text-base" 
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                    </div>
                </div>

                {/* Time */}
                <div className="space-y-1 sm:space-y-2">
                    <label className="block text-sm font-semibold text-black">Time</label>
                    <div className="relative">
                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <ClockIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input 
                            type="time" 
                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 bg-white rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all text-sm sm:text-base" 
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            required
                        />
                    </div>
                </div>
            </div>

             {/* Duration Dropdown with Tooltip */}
             <div className="space-y-1 sm:space-y-2 relative">
                <div className="flex items-center gap-2">
                    <label className="block text-sm font-semibold text-black">Service Duration (Minutes)</label>
                    <div className="relative">
                        <button 
                            type="button"
                            onMouseEnter={() => setShowTooltip(true)}
                            onMouseLeave={() => setShowTooltip(false)}
                            onClick={() => setShowTooltip(!showTooltip)}
                            className="w-4 h-4 rounded-full border border-gray-400 text-gray-500 text-[10px] flex items-center justify-center hover:bg-gray-100"
                        >
                            i
                        </button>
                        {showTooltip && (
                            <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 w-48 bg-black text-white text-xs p-2 rounded shadow-lg z-10 pointer-events-none">
                                Select 0 if customer doesn't request any specific duration
                                <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-black rotate-45"></div>
                            </div>
                        )}
                    </div>
                </div>
                
                <div className="relative">
                    <select 
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className="block w-full px-4 py-3 border border-gray-300 bg-white rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all text-sm sm:text-base appearance-none cursor-pointer"
                    >
                        <option value="0">0 Minutes (No Request)</option>
                        <option value="10">10 Minutes</option>
                        <option value="30">30 Minutes</option>
                        <option value="60">60 Minutes</option>
                        <option value="90">90 Minutes</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                        <ChevronDownIcon className="w-4 h-4 text-gray-500" />
                    </div>
                </div>
            </div>

            {/* Membership Toggle */}
            <div className="space-y-1 sm:space-y-2">
                <label className="block text-sm font-semibold text-black">Member?</label>
                <div className="flex gap-4">
                    <button
                        type="button"
                        onClick={() => setIsMember(true)}
                        className={`flex-1 py-3 px-4 rounded-lg border font-medium transition-all duration-200 text-sm sm:text-base ${
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
                        className={`flex-1 py-3 px-4 rounded-lg border font-medium transition-all duration-200 text-sm sm:text-base ${
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
                <div className="space-y-1 sm:space-y-2 animate-slide-up">
                    <label className="block text-sm font-semibold text-black">Member ID</label>
                    <div className="relative">
                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <UserGroupIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input 
                            type="text" 
                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 bg-white rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all text-sm sm:text-base" 
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
                    className="w-full flex items-center justify-center py-3 sm:py-4 px-8 border border-transparent rounded-full shadow-lg text-sm sm:text-base font-bold text-white bg-black hover:bg-gray-800 transition-colors"
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
