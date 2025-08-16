'use client';

import { Book, Tag } from 'lucide-react';
import React, { useState, useEffect, useMemo } from 'react';

// --- MOCK DATA ---
// In a real application, this data would be fetched from your database.
// The structure should align with your Drizzle schema.
const initialSubjects = [
    { id: 'sub-1', name: 'Physics' },
    { id: 'sub-2', name: 'Chemistry' },
    { id: 'sub-3', name: 'Mathematics' },
];

const initialTopics = {
    'sub-1': [{ id: 'top-1a', name: 'Kinematics' }, { id: 'top-1b', name: 'Work, Energy, and Power' }],
    'sub-2': [{ id: 'top-2a', name: 'Atomic Structure' }, { id: 'top-2b', name: 'Chemical Bonding' }],
    'sub-3': [{ id: 'top-3a', name: 'Calculus' }, { id: 'top-3b', name: 'Trigonometry' }],
};

const allQuestions = [
    { id: 'q1', questionText: 'What is the formula for kinetic energy?', level: 'SSC', subjectId: 'sub-1', topicId: 'top-1b', correctAnswer: 'A' },
    { id: 'q2', questionText: 'Which element has the atomic number 1?', level: 'HSC', subjectId: 'sub-2', topicId: 'top-2a', correctAnswer: 'B' },
    { id: 'q3', questionText: 'What is the derivative of x^2?', level: 'HSC', subjectId: 'sub-3', topicId: 'top-3a', correctAnswer: 'C' },
    { id: 'q4', questionText: 'What does "v" represent in the equation s = vt?', level: 'SSC', subjectId: 'sub-1', topicId: 'top-1a', correctAnswer: 'D' },
    { id: 'q5', questionText: 'How many electrons can the first shell hold?', level: 'SSC', subjectId: 'sub-2', topicId: 'top-2a', correctAnswer: 'A' },
    { id: 'q6', questionText: 'What is sin(90 degrees)?', level: 'Job', subjectId: 'sub-3', topicId: 'top-3b', correctAnswer: 'B' },
    { id: 'q7', questionText: 'The rate of change of displacement is called?', level: 'SSC', subjectId: 'sub-1', topicId: 'top-1a', correctAnswer: 'C' },
    { id: 'q8', questionText: 'What type of bond is found in NaCl?', level: 'HSC', subjectId: 'sub-2', topicId: 'top-2b', correctAnswer: 'A' },
    // Add more questions to test pagination
    { id: 'q9', questionText: 'Integrate 2x.', level: 'HSC', subjectId: 'sub-3', topicId: 'top-3a', correctAnswer: 'D' },
    { id: 'q10', questionText: 'What is the unit of power?', level: 'Job', subjectId: 'sub-1', topicId: 'top-1b', correctAnswer: 'B' },
    { id: 'q11', questionText: 'What is the charge of a neutron?', level: 'SSC', subjectId: 'sub-2', topicId: 'top-2a', correctAnswer: 'C' },
    { id: 'q12', questionText: 'What is cos(0 degrees)?', level: 'HSC', subjectId: 'sub-3', topicId: 'top-3b', correctAnswer: 'A' },
];
// --- END MOCK DATA ---


// --- SVG Icons ---
const PlusIcon = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>);
const XIcon = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>);
const SearchIcon = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>);
const EditIcon = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>);
const DeleteIcon = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>);
const ViewIcon = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>);
const ChevronLeftIcon = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>);
const ChevronRightIcon = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>);


// --- Reusable Modal Component (can be shared across pages) ---
const AddNewModal = ({ isOpen, onClose, title, onSave, children }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                <div className="p-4 border-b flex justify-between items-center"><h3 className="text-lg font-semibold text-gray-800">{title}</h3><button onClick={onClose} className="text-gray-500 hover:text-gray-800"><XIcon className="w-5 h-5" /></button></div>
                <div className="p-6">{children}</div>
                <div className="p-4 bg-gray-50 border-t flex justify-end space-x-2"><button onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors">Cancel</button><button onClick={onSave} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">Save</button></div>
            </div>
        </div>
    );
};

const ITEMS_PER_PAGE = 10;

// --- Main Question Bank Page Component ---
export default function QuestionBankPage() {
    // --- STATE MANAGEMENT ---
    const [questions, setQuestions] = useState(allQuestions);
    const [subjects, setSubjects] = useState(initialSubjects);
    // In a real app, topics would be managed more globally or fetched as needed
    const [topics, setTopics] = useState(initialTopics);

    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({ level: '', subjectId: '', topicId: '' });
    const [availableTopics, setAvailableTopics] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    // Modal state
    const [isSubjectModalOpen, setIsSubjectModalOpen] = useState(false);
    const [isTopicModalOpen, setIsTopicModalOpen] = useState(false);
    const [newSubjectName, setNewSubjectName] = useState('');
    const [newTopicName, setNewTopicName] = useState('');

    // --- DERIVED STATE & MEMOIZATION ---

    // Memoize the filtering logic to avoid re-computation on every render
    const filteredQuestions = useMemo(() => {
        return questions
            .filter(q => q.questionText.toLowerCase().includes(searchTerm.toLowerCase()))
            .filter(q => filters.level ? q.level === filters.level : true)
            .filter(q => filters.subjectId ? q.subjectId === filters.subjectId : true)
            .filter(q => filters.topicId ? q.topicId === filters.topicId : true);
    }, [questions, searchTerm, filters]);

    // Paginated data
    const paginatedQuestions = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredQuestions.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [filteredQuestions, currentPage]);

    const totalPages = Math.ceil(filteredQuestions.length / ITEMS_PER_PAGE);

    // --- SIDE EFFECTS ---

    // Effect to update available topics when the subject filter changes
    useEffect(() => {
        if (filters.subjectId) {
            setAvailableTopics(topics[filters.subjectId] || []);
        } else {
            setAvailableTopics([]);
        }
        // Reset topic filter when subject changes
        setFilters(f => ({ ...f, topicId: '' }));
    }, [filters.subjectId, topics]);

    // Reset to page 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, filters]);

    // --- HANDLERS ---
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleClearFilters = () => {
        setSearchTerm('');
        setFilters({ level: '', subjectId: '', topicId: '' });
    };

    // Placeholder handlers for actions
    const handleEdit = (id) => console.log(`Edit question ${id}`);
    const handleDelete = (id) => {
        // In a real app, show a confirmation modal before deleting
        console.log(`Delete question ${id}`);
        // setQuestions(prev => prev.filter(q => q.id !== id));
    };
    const handleView = (id) => console.log(`View question ${id}`);

    // Pagination handlers
    const handleNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
    const handlePrevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

    // --- RENDER ---
    const getSubjectName = (id) => subjects.find(s => s.id === id)?.name || 'N/A';
    const getTopicName = (subjectId, topicId) => topics[subjectId]?.find(t => t.id === topicId)?.name || 'N/A';

    return (
        <>
            <div className="bg-gray-50 p-4 sm:p-6 lg:p-8">
                <div className="mx-auto">

                    {/* Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Question Bank</h1>
                            <p className="text-gray-500 mt-1">Manage, filter, and search your questions.</p>
                        </div>
                        <a href="/create-question" className="px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all flex items-center space-x-2 whitespace-nowrap">
                            <PlusIcon className="w-5 h-5" />
                            <span>Create New Question</span>
                        </a>
                    </div>

                    {/* Search and Filters */}
                    <div className="bg-white p-4 rounded-xl shadow-lg mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            {/* Search */}
                            <div className="relative lg:col-span-2">
                                <label htmlFor="search" className="sr-only">Search</label>
                                <input
                                    id="search"
                                    type="text"
                                    placeholder="Search by question text..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full p-2 pl-10 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                />
                                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            </div>
                            {/* Subject Filter */}
                            <select name="subjectId" value={filters.subjectId} onChange={handleFilterChange} className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                                <option value="">All Subjects</option>
                                {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                            </select>
                            {/* Topic Filter */}
                            <select name="topicId" value={filters.topicId} onChange={handleFilterChange} disabled={!filters.subjectId} className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100">
                                <option value="">All Topics</option>
                                {availableTopics.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                            </select>
                            <button onClick={handleClearFilters} className="w-full md:w-auto justify-self-start md:justify-self-end px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors">
                                Clear Filters
                            </button>
                        </div>
                    </div>

                    {/* Questions Display */}
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        <div className=" p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {paginatedQuestions.length > 0 ? paginatedQuestions.map(q => (
                                <div key={q.id} className="flex flex-col justify-between bg-gray-50 border border-gray-200 rounded-lg p-4">
                                    <div>
                                        <p className="font-semibold text-gray-800 mb-3">{q.questionText}</p>
                                        <div className="flex items-center space-x-2 text-xs mb-3">
                                            {/* Subject Tag Component */}
                                            <div className="flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-md transition-colors hover:bg-blue-200 cursor-pointer">
                                                <Book className="h-5 w-5" strokeWidth={2} />
                                                <span className="font-medium text-sm">Subject</span>
                                            </div>

                                            {/* Topic Tag Component */}
                                            <div className="flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-md transition-colors hover:bg-green-200 cursor-pointer">
                                                <Tag className="h-5 w-5" strokeWidth={2} />
                                                <span className="font-medium text-sm">Topic</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="border-t border-t-gray-300 pt-3 flex justify-between items-center">
                                        <p className="text-sm bg-green-100 px-1 border rounded-sm border-green-500 text-gray-600">Answer: <span className="font-bold">{q.correctAnswer}</span></p>
                                        <div className="flex items-center space-x-3">
                                            <button onClick={() => handleView(q.id)} className="text-blue-600" title="View"><ViewIcon className="w-5 h-5" /></button>
                                            <button onClick={() => handleEdit(q.id)} className="text-green-600" title="Edit"><EditIcon className="w-5 h-5" /></button>
                                            <button onClick={() => handleDelete(q.id)} className="text-red-600" title="Delete"><DeleteIcon className="w-5 h-5" /></button>
                                        </div>
                                    </div>
                                </div>
                            )) : (
                                <div className="text-center py-10 text-gray-500">No questions found.</div>
                            )}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                                <div className="flex-1 flex justify-between sm:hidden">
                                    <button onClick={handlePrevPage} disabled={currentPage === 1} className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50">Previous</button>
                                    <button onClick={handleNextPage} disabled={currentPage === totalPages} className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50">Next</button>
                                </div>
                                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                    <div>
                                        <p className="text-sm text-gray-700">
                                            Showing <span className="font-medium">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> to <span className="font-medium">{Math.min(currentPage * ITEMS_PER_PAGE, filteredQuestions.length)}</span> of{' '}
                                            <span className="font-medium">{filteredQuestions.length}</span> results
                                        </p>
                                    </div>
                                    <div>
                                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                            <button onClick={handlePrevPage} disabled={currentPage === 1} className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50">
                                                <ChevronLeftIcon className="h-5 w-5" />
                                            </button>
                                            <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                                                Page {currentPage} of {totalPages}
                                            </span>
                                            <button onClick={handleNextPage} disabled={currentPage === totalPages} className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50">
                                                <ChevronRightIcon className="h-5 w-5" />
                                            </button>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
