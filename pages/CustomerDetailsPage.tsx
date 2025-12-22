
import React, { useState, useEffect } from 'react';
import { CalendarIcon, ClockIcon, UserCircleIcon, UserGroupIcon, ChevronDownIcon } from '../components/AppIcons';
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
    <div className="fixed inset-0 w-full h-full flex items-center justify-center p-4 animate-fade-in bg-black overflow-y-auto custom-scrollbar">
      
      {/* CINEMATIC BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 opacity-50"
          style={{ 
            backgroundImage: `url("/images/service-bg.jpeg")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        {/* Dark dim overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/50 to-black/95 z-[1]" />
        <div className="absolute inset-0 backdrop-blur-[1px] z-[2]" />
      </div>

      <div className="relative z-10 w-full max-w-md pt-32 pb-16 px-4">
        {/* FLOATING CONTENT */}
        <div className="animate-fade-in-up">
            
            <div className="mb-10 text-center">
                 <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tighter mb-2 uppercase drop-shadow-lg">
                    Customer Details
                 </h1>
                 <p className="text-white/40 text-[9px] font-black uppercase tracking-[0.4em] drop-shadow-md">
                    Consultation Requirements
                 </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Customer Name */}
                <div className="space-y-1.5">
                    <label className="block text-[9px] font-black text-white/40 uppercase tracking-widest ml-1">Customer Name</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <UserCircleIcon className="h-4 w-4 text-white/20" />
                        </div>
                        <input 
                            type="text" 
                            className="block w-full pl-12 pr-4 py-3.5 bg-white/10 backdrop-blur-md border border-white/10 rounded-xl text-sm text-white placeholder-white/10 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all font-semibold shadow-xl" 
                            placeholder="Enter client's full name"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Date */}
                    <div className="space-y-1.5">
                        <label className="block text-[9px] font-black text-white/40 uppercase tracking-widest ml-1">Date</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <CalendarIcon className="h-4 w-4 text-white/20" />
                            </div>
                            <input 
                                type="date" 
                                className="block w-full pl-12 pr-4 py-3.5 bg-white/10 backdrop-blur-md border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-white/20 transition-all font-semibold [color-scheme:dark] shadow-xl" 
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {/* Time */}
                    <div className="space-y-1.5">
                        <label className="block text-[9px] font-black text-white/40 uppercase tracking-widest ml-1">Time</label>
                        <div className="relative">
                             <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <ClockIcon className="h-4 w-4 text-white/20" />
                            </div>
                            <input 
                                type="time" 
                                className="block w-full pl-12 pr-4 py-3.5 bg-white/10 backdrop-blur-md border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-white/20 transition-all font-semibold [color-scheme:dark] shadow-xl" 
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                </div>

                 {/* Duration Dropdown */}
                 <div className="space-y-1.5 relative">
                    <div className="flex items-center gap-2">
                        <label className="block text-[9px] font-black text-white/40 uppercase tracking-widest ml-1">Service Duration</label>
                        <div className="relative">
                            <button 
                                type="button"
                                onMouseEnter={() => setShowTooltip(true)}
                                onMouseLeave={() => setShowTooltip(false)}
                                className="w-3.5 h-3.5 rounded-full border border-white/20 text-white/30 text-[8px] flex items-center justify-center hover:bg-white/10 transition-colors"
                            >
                                i
                            </button>
                            {showTooltip && (
                                <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 w-40 bg-white text-black text-[8px] font-bold uppercase p-2.5 rounded-lg shadow-2xl z-50 pointer-events-none tracking-wider">
                                    Select 0 if customer doesn't request specific duration
                                    <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-1.5 h-1.5 bg-white rotate-45"></div>
                                </div>
                            )}
                        </div>
                    </div>
                    
                    <div className="relative">
                        <select 
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            className="block w-full px-5 py-3.5 bg-white/10 backdrop-blur-md border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-white/20 transition-all font-semibold appearance-none cursor-pointer shadow-xl"
                        >
                            <option value="0" className="bg-neutral-900">0 Minutes (No Request)</option>
                            <option value="10" className="bg-neutral-900">10 Minutes</option>
                            <option value="30" className="bg-neutral-900">30 Minutes</option>
                            <option value="60" className="bg-neutral-900">60 Minutes</option>
                            <option value="90" className="bg-neutral-900">90 Minutes</option>
                        </select>
                        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
                            <ChevronDownIcon className="w-3 h-3 text-white/30" />
                        </div>
                    </div>
                </div>

                {/* Membership Toggle */}
                <div className="space-y-1.5">
                    <label className="block text-[9px] font-black text-white/40 uppercase tracking-widest ml-1">Member Status</label>
                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={() => setIsMember(true)}
                            className={`flex-1 py-3.5 px-4 rounded-xl border font-black text-[10px] uppercase tracking-widest transition-all duration-300 shadow-lg ${
                                isMember 
                                ? 'bg-white text-black border-white shadow-[0_10px_20px_rgba(255,255,255,0.15)] scale-[1.02] z-10' 
                                : 'bg-white/5 text-white/20 border-white/5 hover:border-white/10'
                            }`}
                        >
                            Member
                        </button>
                        <button
                            type="button"
                            onClick={() => { setIsMember(false); setMemberId(''); }}
                            className={`flex-1 py-3.5 px-4 rounded-xl border font-black text-[10px] uppercase tracking-widest transition-all duration-300 shadow-lg ${
                                !isMember 
                                ? 'bg-white text-black border-white shadow-[0_10px_20px_rgba(255,255,255,0.15)] scale-[1.02] z-10' 
                                : 'bg-white/5 text-white/20 border-white/5 hover:border-white/10'
                            }`}
                        >
                            Guest
                        </button>
                    </div>
                </div>

                {/* Member ID Input (Conditional) */}
                {isMember && (
                    <div className="space-y-1.5 animate-fade-in-up">
                        <label className="block text-[9px] font-black text-white/40 uppercase tracking-widest ml-1">Member ID</label>
                        <div className="relative">
                             <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <UserGroupIcon className="h-4 w-4 text-white/20" />
                            </div>
                            <input 
                                type="text" 
                                className="block w-full pl-12 pr-4 py-3.5 bg-white/10 backdrop-blur-md border border-white/10 rounded-xl text-xs text-white placeholder-white/10 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all font-semibold shadow-xl" 
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
                        className="w-full flex items-center justify-center py-4 bg-white text-black rounded-full shadow-[0_20px_40px_rgba(255,255,255,0.1)] text-[10px] font-black uppercase tracking-[0.3em] hover:scale-105 active:scale-95 transition-all"
                    >
                        Select Service
                    </button>
                </div>
            </form>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetailsPage;
