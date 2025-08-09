const ResultsHistory = () => (
    <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-800">My Results</h3>
            <a href="#" className="text-sm font-semibold text-indigo-600 hover:underline">View All History &rarr;</a>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-slate-500">
                <thead className="text-xs text-slate-700 uppercase bg-slate-50">
                    <tr>
                        <th scope="col" className="px-6 py-3">Subject</th>
                        <th scope="col" className="px-6 py-3">Date</th>
                        <th scope="col" className="px-6 py-3">Score</th>
                        <th scope="col" className="px-6 py-3">Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="bg-white border-b hover:bg-slate-50">
                        <th scope="row" className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap">Calculus I</th>
                        <td className="px-6 py-4">Aug 05, 2025</td>
                        <td className="px-6 py-4 font-semibold">92%</td>
                        <td className="px-6 py-4"><span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">Pass</span></td>
                    </tr>
                    <tr className="bg-white border-b hover:bg-slate-50">
                        <th scope="row" className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap">English Literature</th>
                        <td className="px-6 py-4">Jul 28, 2025</td>
                        <td className="px-6 py-4 font-semibold">85%</td>
                        <td className="px-6 py-4"><span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">Pass</span></td>
                    </tr>
                    <tr className="bg-white hover:bg-slate-50">
                        <th scope="row" className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap">Intro to Programming</th>
                        <td className="px-6 py-4">Jul 21, 2025</td>
                        <td className="px-6 py-4 font-semibold">58%</td>
                        <td className="px-6 py-4"><span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">Fail</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
);

export default ResultsHistory;