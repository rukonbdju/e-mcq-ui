const ExamManagement = () => (
    <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Exam Management</h3>
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-slate-500">
                <thead className="text-xs text-slate-700 uppercase bg-slate-50">
                    <tr>
                        <th scope="col" className="px-6 py-3">Exam Name</th>
                        <th scope="col" className="px-6 py-3">Submissions</th>
                        <th scope="col" className="px-6 py-3">Status</th>
                        <th scope="col" className="px-6 py-3 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="bg-white border-b hover:bg-slate-50">
                        <td className="px-6 py-4 font-medium text-slate-900">Modern Physics - Midterm</td>
                        <td className="px-6 py-4">32 / 35</td>
                        <td className="px-6 py-4"><span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">Live</span></td>
                        <td className="px-6 py-4 text-center space-x-2">
                            <button className="font-medium text-teal-600 hover:underline">View</button>
                            <button className="font-medium text-slate-500 hover:underline">Edit</button>
                        </td>
                    </tr>
                    <tr className="bg-white border-b hover:bg-slate-50">
                        <td className="px-6 py-4 font-medium text-slate-900">Calculus I - Final</td>
                        <td className="px-6 py-4">0 / 40</td>
                        <td className="px-6 py-4"><span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-sky-100 text-sky-800">Published</span></td>
                        <td className="px-6 py-4 text-center space-x-2">
                            <button className="font-medium text-teal-600 hover:underline">Preview</button>
                            <button className="font-medium text-slate-500 hover:underline">Edit</button>
                        </td>
                    </tr>
                    <tr className="bg-white border-b hover:bg-slate-50">
                        <td className="px-6 py-4 font-medium text-slate-900">Organic Chemistry - Quiz 3</td>
                        <td className="px-6 py-4">28 / 28</td>
                        <td className="px-6 py-4"><span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-200 text-slate-800">Completed</span></td>
                        <td className="px-6 py-4 text-center space-x-2">
                            <button className="font-medium text-teal-600 hover:underline">Grade</button>
                            <button className="font-medium text-slate-500 hover:underline">Results</button>
                        </td>
                    </tr>
                    <tr className="bg-white hover:bg-slate-50">
                        <td className="px-6 py-4 font-medium text-slate-900">Intro to Programming - Final</td>
                        <td className="px-6 py-4">-</td>
                        <td className="px-6 py-4"><span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">Draft</span></td>
                        <td className="px-6 py-4 text-center space-x-2">
                            <button className="font-medium text-teal-600 hover:underline">Build</button>
                            <button className="font-medium text-slate-500 hover:underline">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
);

export default ExamManagement;