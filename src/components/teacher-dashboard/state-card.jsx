const StatCards = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-5 rounded-xl shadow-sm flex items-center justify-between">
            <div>
                <p className="text-sm text-slate-500">Active Exams</p>
                <p className="text-3xl font-bold text-slate-800">04</p>
            </div>
            <div className="bg-teal-100 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-600"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /><path d="m15 5 4 4" /></svg>
            </div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm flex items-center justify-between">
            <div>
                <p className="text-sm text-slate-500">Total Students</p>
                <p className="text-3xl font-bold text-slate-800">182</p>
            </div>
            <div className="bg-sky-100 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sky-600"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
            </div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm flex items-center justify-between">
            <div>
                <p className="text-sm text-slate-500">Pending Gradings</p>
                <p className="text-3xl font-bold text-slate-800">12</p>
            </div>
            <div className="bg-amber-100 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600"><path d="M12 20h.01" /><path d="M12 6v8" /><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Z" /></svg>
            </div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm flex items-center justify-between">
            <div>
                <p className="text-sm text-slate-500">Avg. Pass Rate</p>
                <p className="text-3xl font-bold text-slate-800">78%</p>
            </div>
            <div className="bg-emerald-100 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="M22 4 12 14.01l-3-3" /></svg>
            </div>
        </div>
    </div>
);

export default StatCards