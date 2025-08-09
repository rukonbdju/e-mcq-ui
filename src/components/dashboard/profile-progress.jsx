const ProfileProgress = () => (
    <div className="bg-white p-6 rounded-xl shadow-sm text-center">
        <img src="https://placehold.co/80x80/E0E7FF/4338CA?text=JS" alt="Jordan Smith" className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-white shadow-lg" />
        <h4 className="text-lg font-semibold text-slate-800">Jordan Smith</h4>
        <p className="text-sm text-slate-500">Global Rank: #1,245</p>
        <div className="flex justify-center space-x-4 my-4">
            <div className="text-yellow-500" title="Top 10% Finisher"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg></div>
            <div className="text-slate-400" title="5 Exams Completed"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg></div>
            <div className="text-amber-600" title="3 Day Streak"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M17.66 7.93L12 2l-5.66 5.93C3.38 11.23 2 14.42 2 17.5A10 10 0 0012 23a10 10 0 0010-5.5c0-3.08-1.38-6.27-4.34-9.57z" /></svg></div>
        </div>
        <div className="relative w-32 h-32 mx-auto">
            <svg className="w-full h-full" viewBox="0 0 36 36" style={{ transform: 'rotate(-90deg)' }}>
                <path className="text-slate-200" stroke="currentColor" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="text-indigo-600" stroke="currentColor" strokeWidth="3" fill="none" strokeDasharray="85, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-slate-800">85%</span>
                <span className="text-xs text-slate-500">Avg. Score</span>
            </div>
        </div>
    </div>
);

export default ProfileProgress;