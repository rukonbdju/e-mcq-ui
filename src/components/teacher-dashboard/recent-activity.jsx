const RecentActivity = () => (
    <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Recent Activity</h3>
        <div className="space-y-4">
            <div className="flex items-start gap-4">
                <img src="https://placehold.co/40x40/E0E7FF/4338CA?text=JS" alt="Jordan Smith" className="w-10 h-10 rounded-full" />
                <div>
                    <p className="text-sm text-slate-600"><span className="font-semibold text-slate-800">Jordan Smith</span> submitted the <span className="font-semibold">Modern Physics</span> exam.</p>
                    <p className="text-xs text-slate-400">5 minutes ago</p>
                </div>
            </div>
            <div className="flex items-start gap-4">
                <img src="https://placehold.co/40x40/FEE2E2/991B1B?text=AM" alt="Anna Miller" className="w-10 h-10 rounded-full" />
                <div>
                    <p className="text-sm text-slate-600"><span className="font-semibold text-slate-800">Anna Miller</span> submitted the <span className="font-semibold">Modern Physics</span> exam.</p>
                    <p className="text-xs text-slate-400">12 minutes ago</p>
                </div>
            </div>
            <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-600"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" /><path d="m9 12 2 2 4-4" /></svg>
                </div>
                <div>
                    <p className="text-sm text-slate-600">You published the <span className="font-semibold">Calculus I - Final</span> exam.</p>
                    <p className="text-xs text-slate-400">1 hour ago</p>
                </div>
            </div>
        </div>
    </div>
);

export default RecentActivity