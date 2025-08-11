'use client'

import Link from "next/link";
import { useState } from "react";

const mockExams = [
    { id: 1, title: 'Modern Physics - Midterm', subject: 'Physics', questions: 50, duration: 90, marks: 100, status: 'Live', created: 'Aug 01, 2025' },
    { id: 2, title: 'Calculus I - Final Exam', subject: 'Mathematics', questions: 40, duration: 120, marks: 100, status: 'Published', created: 'Jul 25, 2025' },
    { id: 3, title: 'Organic Chemistry - Quiz 3', subject: 'Chemistry', questions: 20, duration: 30, marks: 20, status: 'Completed', created: 'Jul 20, 2025' },
    { id: 4, title: 'Intro to Programming - Final', subject: 'Computer Science', questions: 60, duration: 120, marks: 100, status: 'Draft', created: 'Jul 15, 2025' },
    { id: 5, title: 'World History: 1900-1945', subject: 'History', questions: 75, duration: 90, marks: 75, status: 'Completed', created: 'Jul 10, 2025' },
    { id: 6, title: 'English Literature - Midterm', subject: 'Literature', questions: 30, duration: 60, marks: 50, status: 'Draft', created: 'Aug 05, 2025' },
];

const StatusBadge = ({ status }) => {
    const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
    const statusClasses = {
        Live: "bg-emerald-100 text-emerald-800",
        Published: "bg-sky-100 text-sky-800",
        Completed: "bg-slate-200 text-slate-800",
        Draft: "bg-amber-100 text-amber-800",
    };
    return <span className={`${baseClasses} ${statusClasses[status]}`}>{status}</span>;
};

const ExamCard = ({ exam }) => (
    <div className="bg-white p-5 rounded-lg border hover:shadow-md transition-shadow duration-200 flex flex-col justify-between">
        <div>
            <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-slate-800 pr-4">{exam.title}</h4>
                <StatusBadge status={exam.status} />
            </div>
            <p className="text-sm text-slate-500 mb-4">{exam.subject}</p>
            <div className="flex items-center text-sm text-slate-600 space-x-4 border-t pt-4">
                <span>{exam.questions} Questions</span>
                <span className="h-4 border-l"></span>
                <span>{exam.duration} mins</span>
                <span className="h-4 border-l"></span>
                <span>{exam.marks} Marks</span>
            </div>
        </div>
        <div className="flex justify-between items-center mt-4 pt-4 border-t">
            <p className="text-xs text-slate-400">Created: {exam.created}</p>
            <div className="flex items-center space-x-2">
                <button className="text-sm font-medium text-teal-600 hover:underline">View</button>
                <button className="text-sm font-medium text-slate-500 hover:underline">Edit</button>
            </div>
        </div>
    </div>
);

const ExamsPage = () => {
    const [activeTab, setActiveTab] = useState('All');

    const filteredExams = activeTab === 'All'
        ? mockExams
        : mockExams.filter(exam => exam.status === activeTab);

    const tabs = ['All', 'Live', 'Published', 'Draft', 'Completed'];

    return (
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">My Exams</h2>
                    <p className="text-sm text-slate-500 mt-1">Manage, create, and review all your exams.</p>
                </div>
                <Link href={'/teacher/exams/new'}>
                    <button className="mt-4 sm:mt-0 px-4 py-2 bg-teal-600 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-teal-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                        Create New Exam
                    </button>
                </Link>
            </div>

            {/* Tabs and Filters */}
            <div className="mb-6">
                <div className="border-b border-slate-200">
                    <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                        {tabs.map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`${activeTab === tab
                                    ? 'border-teal-500 text-teal-600'
                                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                                    } whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm`}
                            >
                                {tab}
                            </button>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Exams Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredExams.map(exam => (
                    <ExamCard key={exam.id} exam={exam} />
                ))}
            </div>
        </main>
    );
};

export default ExamsPage