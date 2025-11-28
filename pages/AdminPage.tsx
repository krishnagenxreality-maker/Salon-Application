
import React from 'react';
import { UserCircleIcon, CalendarIcon, ClockIcon } from '../components/AppIcons';

const AdminPage: React.FC = () => {
    return (
        <div className="w-full min-h-screen bg-white pt-28 pb-16 px-4 md:px-8 lg:px-12 animate-fade-in">
             <div className="max-w-screen-xl mx-auto">
                {/* Header */}
                <div className="mb-12 border-b border-gray-200 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-black tracking-tighter">
                            Admin Dashboard
                        </h1>
                        <p className="mt-2 text-gray-500 text-lg">
                            System Overview & User Management
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-600">
                            <CalendarIcon className="w-4 h-4" />
                            <span>{new Date().toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-bold">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span>System Online</span>
                        </div>
                    </div>
                </div>

                {/* Dashboard Stats Placeholder */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {[
                        { label: 'Total Candidates', value: '0', icon: UserCircleIcon },
                        { label: 'Active Sessions', value: '0', icon: ClockIcon },
                        { label: 'Completions', value: '0', icon: CalendarIcon },
                    ].map((stat, idx) => (
                        <div key={idx} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex items-center justify-between">
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{stat.label}</p>
                                <p className="text-3xl font-extrabold text-black">{stat.value}</p>
                            </div>
                            <div className="h-12 w-12 bg-light-grey rounded-full flex items-center justify-center text-black">
                                <stat.icon className="w-6 h-6" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State Area */}
                <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl min-h-[400px] flex flex-col items-center justify-center text-center p-8">
                    <div className="h-20 w-20 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm mb-6">
                         <UserCircleIcon className="w-10 h-10 text-gray-300" />
                    </div>
                    <h3 className="text-xl font-bold text-black mb-2">No Candidate Data Available</h3>
                    <p className="text-gray-500 max-w-md mx-auto mb-8">
                        The candidate database is currently empty. Integration with the backend API is required to populate real-time training metrics.
                    </p>
                    <button className="px-6 py-3 bg-white border border-gray-300 rounded-lg text-gray-400 font-medium cursor-not-allowed shadow-sm">
                        Sync Database
                    </button>
                </div>
             </div>
        </div>
    );
};

export default AdminPage;
