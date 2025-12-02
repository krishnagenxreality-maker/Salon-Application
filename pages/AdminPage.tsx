
import React from 'react';
import { UserCircleIcon, CalendarIcon, ClockIcon } from '../components/AppIcons';

const AdminPage: React.FC = () => {
    return (
        <div className="w-full min-h-screen bg-white dark:bg-gray-900 pt-24 sm:pt-28 pb-16 px-4 sm:px-6 md:px-8 lg:px-12 animate-fade-in transition-colors duration-300">
             <div className="max-w-screen-xl mx-auto">
                {/* Header */}
                <div className="mb-8 sm:mb-12 border-b border-gray-200 dark:border-gray-800 pb-6 sm:pb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-black dark:text-white tracking-tighter">
                            Admin Dashboard
                        </h1>
                        <p className="mt-2 text-gray-500 dark:text-gray-400 text-base sm:text-lg">
                            System Overview & User Management
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                        <div className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300">
                            <CalendarIcon className="w-4 h-4" />
                            <span>{new Date().toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-xs sm:text-sm font-bold">
                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span>System Online</span>
                        </div>
                    </div>
                </div>

                {/* Dashboard Stats Placeholder */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
                    {[
                        { label: 'Total Candidates', value: '0', icon: UserCircleIcon },
                        { label: 'Active Sessions', value: '0', icon: ClockIcon },
                        { label: 'Completions', value: '0', icon: CalendarIcon },
                    ].map((stat, idx) => (
                        <div key={idx} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm flex items-center justify-between">
                            <div>
                                <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">{stat.label}</p>
                                <p className="text-2xl sm:text-3xl font-extrabold text-black dark:text-white">{stat.value}</p>
                            </div>
                            <div className="h-10 w-10 sm:h-12 sm:w-12 bg-light-grey dark:bg-gray-700 rounded-full flex items-center justify-center text-black dark:text-white">
                                <stat.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State Area */}
                <div className="bg-gray-50 dark:bg-gray-800/50 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl min-h-[300px] sm:min-h-[400px] flex flex-col items-center justify-center text-center p-6 sm:p-8">
                    <div className="h-16 w-16 sm:h-20 sm:w-20 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full flex items-center justify-center shadow-sm mb-4 sm:mb-6">
                         <UserCircleIcon className="w-8 h-8 sm:w-10 sm:h-10 text-gray-300 dark:text-gray-600" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-black dark:text-white mb-2">No Candidate Data Available</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base max-w-md mx-auto mb-6 sm:mb-8">
                        The candidate database is currently empty. Integration with the backend API is required to populate real-time training metrics.
                    </p>
                    <button className="px-6 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-400 dark:text-gray-500 font-medium cursor-not-allowed shadow-sm text-sm sm:text-base">
                        Sync Database
                    </button>
                </div>
             </div>
        </div>
    );
};

export default AdminPage;
