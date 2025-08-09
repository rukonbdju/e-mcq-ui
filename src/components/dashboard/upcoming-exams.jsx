import Countdown from "../countdown";

const UpcomingExams = () => (
    <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Upcoming Exams</h3>
        <div className="space-y-4">
            <div className="bg-slate-50 p-4 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="bg-indigo-100 p-3 rounded-lg"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" /></svg></div>
                    <div>
                        <p className="font-semibold text-slate-700">Modern Physics</p>
                        <p className="text-sm text-slate-500">Aug 10, 2025 | 10:00 AM | 60 mins</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="text-center">
                        <p className="text-sm text-slate-500">Starts in</p>
                        <div className="font-bold text-indigo-600"><Countdown targetDate="2025-08-10T10:00:00" /></div>
                    </div>
                    <button className="w-full sm:w-auto px-6 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Start Exam</button>
                </div>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="bg-sky-100 p-3 rounded-lg"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sky-600"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg></div>
                    <div>
                        <p className="font-semibold text-slate-700">Organic Chemistry</p>
                        <p className="text-sm text-slate-500">Aug 12, 2025 | 02:00 PM | 45 mins</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="text-center">
                        <p className="text-sm text-slate-500">Starts in</p>
                        <div className="font-bold text-sky-600"><Countdown targetDate="2025-08-12T14:00:00" /></div>
                    </div>
                    <button className="w-full sm:w-auto px-6 py-2 bg-slate-300 text-slate-500 text-sm font-semibold rounded-lg cursor-not-allowed">Locked</button>
                </div>
            </div>
        </div>
    </div>
);

export default UpcomingExams;