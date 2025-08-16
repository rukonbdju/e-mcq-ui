'use client'
import React, { useState, useEffect } from 'react';
import {
    Book,
    FileText,
    Clock,
    Calendar,
    Layers,
    Plus,
    Save,
    Rocket,
    Search,
    CheckCircle,
    XCircle,
    ChevronDown,
} from 'lucide-react';

// Mock data to simulate fetching from a database (Drizzle ORM)
const mockSubjects = [
    { id: 'sub-1', name: 'Mathematics' },
    { id: 'sub-2', name: 'Physics' },
    { id: 'sub-3', name: 'Chemistry' },
    { id: 'sub-4', name: 'Biology' },
    { id: 'sub-5', name: 'History' },
];

const mockTopics = [
    { id: 'topic-1', subjectId: 'sub-1', name: 'Algebra' },
    { id: 'topic-2', subjectId: 'sub-1', name: 'Geometry' },
    { id: 'topic-3', subjectId: 'sub-1', name: 'Calculus' },
    { id: 'topic-4', subjectId: 'sub-2', name: 'Mechanics' },
    { id: 'topic-5', subjectId: 'sub-2', name: 'Thermodynamics' },
    { id: 'topic-6', subjectId: 'sub-3', name: 'Organic Chemistry' },
    { id: 'topic-7', subjectId: 'sub-3', name: 'Inorganic Chemistry' },
    { id: 'topic-8', subjectId: 'sub-4', name: 'Cell Biology' },
    { id: 'topic-9', subjectId: 'sub-5', name: 'Ancient History' },
    { id: 'topic-10', subjectId: 'sub-5', name: 'Modern History' },
];

const mockQuestionBank = [
    { id: 'q-1', text: 'What is the value of pi?', subjectId: 'sub-1', topicId: 'topic-2', marks: 5, level: 'Easy' },
    { id: 'q-2', text: 'Who discovered gravity?', subjectId: 'sub-2', topicId: 'topic-4', marks: 10, level: 'Medium' },
    { id: 'q-3', text: 'What is the formula for water?', subjectId: 'sub-3', topicId: 'topic-7', marks: 5, level: 'Easy' },
    { id: 'q-4', text: 'Describe the process of photosynthesis.', subjectId: 'sub-4', topicId: 'topic-8', marks: 15, level: 'Hard' },
    { id: 'q-5', text: 'In which year did World War II end?', subjectId: 'sub-5', topicId: 'topic-10', marks: 5, level: 'Easy' },
    { id: 'q-6', text: 'What is the capital of France?', subjectId: 'sub-5', topicId: 'topic-10', marks: 5, level: 'Easy' },
    { id: 'q-7', text: 'Solve for x: 2x + 5 = 11', subjectId: 'sub-1', topicId: 'topic-1', marks: 8, level: 'Medium' },
    { id: 'q-8', text: 'Explain Newton\'s third law.', subjectId: 'sub-2', topicId: 'topic-4', marks: 12, level: 'Hard' },
    { id: 'q-9', text: 'Balance the chemical equation: C3H8 + O2 -> CO2 + H2O', subjectId: 'sub-3', topicId: 'topic-7', marks: 10, level: 'Medium' },
];

// Helper function to get random questions
const getRandomQuestions = (questions, count, subject, topic, level) => {
    const filteredQuestions = questions.filter(q => {
        return (
            (!subject || q.subjectId === subject) &&
            (!topic || q.topicId === topic) &&
            (!level || q.level === level)
        );
    });
    const shuffled = [...filteredQuestions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};

// Main component
export default function App() {
    // State for exam details
    const [examName, setExamName] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('');
    const [selectedTopics, setSelectedTopics] = useState([]);
    const [durationHours, setDurationHours] = useState(0);
    const [durationMinutes, setDurationMinutes] = useState(0);
    const [totalMarks, setTotalMarks] = useState(0);
    const [examDateTime, setExamDateTime] = useState('');

    // State for dynamic data from DB
    const [subjects, setSubjects] = useState([]);
    const [topics, setTopics] = useState([]);

    // State for question selection modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectionMethod, setSelectionMethod] = useState('manual'); // 'manual' or 'random'
    const [questionBank, setQuestionBank] = useState([]);

    // Manual selection state
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [manualFilterSubject, setManualFilterSubject] = useState('');
    const [manualFilterTopic, setManualFilterTopic] = useState('');

    // Random selection state
    const [randomCount, setRandomCount] = useState(1);
    const [randomSubject, setRandomSubject] = useState('');
    const [randomTopic, setRandomTopic] = useState('');
    const [randomLevel, setRandomLevel] = useState('');

    // Accordion state for mobile view
    const [openAccordion, setOpenAccordion] = useState(null);

    // Simulate data fetching on component mount
    useEffect(() => {
        setSubjects(mockSubjects);
        setTopics(mockTopics);
        setQuestionBank(mockQuestionBank);
    }, []);

    // Filter topics based on selected subject
    const filteredTopics = selectedSubject
        ? topics.filter(t => t.subjectId === selectedSubject)
        : [];

    const handleTopicChange = (topicId) => {
        setSelectedTopics(prev =>
            prev.includes(topicId)
                ? prev.filter(id => id !== topicId)
                : [...prev, topicId]
        );
    };

    const handleManualQuestionSelection = (question) => {
        setSelectedQuestions(prev =>
            prev.some(q => q.id === question.id)
                ? prev.filter(q => q.id !== question.id)
                : [...prev, question]
        );
    };

    const handleAddQuestions = () => {
        if (selectionMethod === 'random') {
            const newRandomQuestions = getRandomQuestions(
                questionBank,
                randomCount,
                randomSubject,
                randomTopic,
                randomLevel
            );
            // Prevent duplicates
            const uniqueNewQuestions = newRandomQuestions.filter(
                q => !selectedQuestions.some(sq => sq.id === q.id)
            );
            setSelectedQuestions(prev => [...prev, ...uniqueNewQuestions]);
        }
        // Manual selection is handled as questions are checked/unchecked
        setIsModalOpen(false);
    };

    const calculateTotalMarks = () => {
        return selectedQuestions.reduce((sum, q) => sum + q.marks, 0);
    };

    const questionSummary = selectedQuestions.reduce((acc, q) => {
        const subjectName = mockSubjects.find(s => s.id === q.subjectId)?.name || 'Unknown';
        if (!acc[subjectName]) {
            acc[subjectName] = { count: 0, marks: 0 };
        }
        acc[subjectName].count++;
        acc[subjectName].marks += q.marks;
        return acc;
    }, {});

    const handleSubmit = (action) => {
        console.log(`Exam ${action}ed`);
        console.log('Exam Details:', {
            examName,
            selectedSubject,
            selectedTopics,
            durationHours,
            durationMinutes,
            examDateTime,
            selectedQuestions,
        });
        // In a real app, this would trigger an API call
        alert(`Exam "${examName}" has been ${action}ed!`);
    };

    const Accordion = ({ title, children, section }) => (
        <div className="bg-white border border-indigo-200 rounded-lg shadow-md mb-4 overflow-hidden md:hidden">
            <button
                onClick={() => setOpenAccordion(openAccordion === section ? null : section)}
                className="w-full flex items-center justify-between p-4 text-gray-800 font-semibold transition-colors duration-200 hover:bg-indigo-50"
            >
                <span>{title}</span>
                <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openAccordion === section ? 'rotate-180' : ''}`} />
            </button>
            <div
                className={`grid transition-all duration-300 ease-in-out ${openAccordion === section ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
            >
                <div className="overflow-hidden p-4">
                    {children}
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-white text-gray-800 p-4 sm:p-6 lg:p-10 font-sans">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-indigo-700">Create New Exam</h1>

                {/* Desktop Layout - Grid */}
                <div className="hidden md:grid md:grid-cols-12 gap-6">
                    <div className="md:col-span-4 lg:col-span-3">
                        <div className="bg-white rounded-lg p-6 shadow-xl sticky top-6 border border-indigo-200">
                            <h2 className="text-2xl font-semibold mb-6 text-indigo-600">Exam Details</h2>
                            <div className="space-y-6">
                                {/* Exam Name */}
                                <div className="flex flex-col">
                                    <label htmlFor="exam-name" className="text-sm font-medium text-gray-600 mb-1">Exam Name</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            id="exam-name"
                                            value={examName}
                                            onChange={(e) => setExamName(e.target.value)}
                                            placeholder="e.g., Midterm Exam"
                                            className="w-full p-3 bg-white border border-indigo-200 rounded-md text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 pl-10"
                                        />
                                        <FileText className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                    </div>
                                </div>

                                {/* Subject */}
                                <div className="flex flex-col">
                                    <label htmlFor="subject-select" className="text-sm font-medium text-gray-600 mb-1">Subject</label>
                                    <div className="relative">
                                        <select
                                            id="subject-select"
                                            value={selectedSubject}
                                            onChange={(e) => setSelectedSubject(e.target.value)}
                                            className="w-full p-3 bg-white border border-indigo-200 rounded-md text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 appearance-none pr-10 pl-10"
                                        >
                                            <option value="" disabled>Select a subject</option>
                                            {subjects.map(subject => (
                                                <option key={subject.id} value={subject.id}>{subject.name}</option>
                                            ))}
                                        </select>
                                        <Book className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                                    </div>
                                </div>

                                {/* Topics (Multi-select) */}
                                <div className="flex flex-col">
                                    <label htmlFor="topic-select" className="text-sm font-medium text-gray-600 mb-1">Topic(s)</label>
                                    <div className="relative">
                                        <div className="relative w-full">
                                            <select
                                                id="topic-select"
                                                multiple
                                                value={selectedTopics}
                                                onChange={(e) => { }} // Disabled as we're handling clicks on the options div
                                                className="hidden" // Hide the native select
                                            >
                                                {filteredTopics.map(topic => (
                                                    <option key={topic.id} value={topic.id}>{topic.name}</option>
                                                ))}
                                            </select>
                                            <div className="w-full min-h-[40px] p-2 bg-white border border-indigo-200 rounded-md text-gray-800 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 transition-colors duration-200 flex flex-wrap gap-2 cursor-pointer">
                                                {selectedTopics.length > 0 ? (
                                                    selectedTopics.map(topicId => {
                                                        const topic = topics.find(t => t.id === topicId);
                                                        return (
                                                            <div key={topicId} className="flex items-center bg-indigo-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                                                                <span>{topic?.name}</span>
                                                                <button onClick={() => handleTopicChange(topicId)} className="ml-1 text-white hover:text-gray-200">
                                                                    <XCircle size={14} />
                                                                </button>
                                                            </div>
                                                        );
                                                    })
                                                ) : (
                                                    <span className="text-gray-400">Select topics...</span>
                                                )}
                                            </div>
                                            <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg overflow-hidden border border-indigo-200 max-h-48 overflow-y-auto">
                                                {filteredTopics.length > 0 ? (
                                                    filteredTopics.map(topic => (
                                                        <div
                                                            key={topic.id}
                                                            className="flex items-center px-4 py-2 cursor-pointer hover:bg-indigo-50 transition-colors duration-200"
                                                            onClick={() => handleTopicChange(topic.id)}
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                checked={selectedTopics.includes(topic.id)}
                                                                readOnly
                                                                className="mr-2 h-4 w-4 text-indigo-500 bg-white border-indigo-200 rounded focus:ring-indigo-500"
                                                            />
                                                            <span className="text-sm text-gray-800">{topic.name}</span>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className="p-4 text-gray-400 text-sm">Select a subject first to see topics.</div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Duration */}
                                <div className="flex flex-col">
                                    <label className="text-sm font-medium text-gray-600 mb-1">Duration</label>
                                    <div className="flex space-x-2 relative items-center">
                                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10" size={20} />
                                        <input
                                            type="number"
                                            value={durationHours}
                                            onChange={(e) => setDurationHours(Math.max(0, parseInt(e.target.value, 10) || 0))}
                                            min="0"
                                            className="w-1/2 p-3 bg-white border border-indigo-200 rounded-md text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 pl-10 pr-2"
                                            placeholder="Hours"
                                        />
                                        <span className="text-gray-400">:</span>
                                        <input
                                            type="number"
                                            value={durationMinutes}
                                            onChange={(e) => setDurationMinutes(Math.min(59, Math.max(0, parseInt(e.target.value, 10) || 0)))}
                                            min="0"
                                            max="59"
                                            className="w-1/2 p-3 bg-white border border-indigo-200 rounded-md text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 pr-2"
                                            placeholder="Minutes"
                                        />
                                    </div>
                                </div>

                                {/* Total Marks */}
                                <div className="flex flex-col">
                                    <label htmlFor="total-marks" className="text-sm font-medium text-gray-600 mb-1">Total Marks</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            id="total-marks"
                                            value={totalMarks}
                                            onChange={(e) => setTotalMarks(Math.max(0, parseInt(e.target.value, 10) || 0))}
                                            min="0"
                                            className="w-full p-3 bg-white border border-indigo-200 rounded-md text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 pl-10"
                                            placeholder="e.g., 100"
                                        />
                                        <Layers className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                    </div>
                                </div>

                                {/* Exam Date & Time */}
                                <div className="flex flex-col">
                                    <label htmlFor="exam-datetime" className="text-sm font-medium text-gray-600 mb-1">Exam Date & Time</label>
                                    <div className="relative">
                                        <input
                                            type="datetime-local"
                                            id="exam-datetime"
                                            value={examDateTime}
                                            onChange={(e) => setExamDateTime(e.target.value)}
                                            className="w-full p-3 bg-white border border-indigo-200 rounded-md text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                                        />
                                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-8 lg:col-span-9">
                        {/* Question Selection & Summary Section */}
                        <div className="bg-white rounded-lg p-6 shadow-xl mb-6 border border-indigo-200">
                            <h2 className="text-2xl font-semibold mb-6 text-indigo-600">Question Selection</h2>
                            <div className="flex justify-between items-center mb-4">
                                <p className="text-gray-600 text-sm">Choose questions for your exam from the question bank.</p>
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 transition-colors duration-200 flex items-center space-x-2"
                                >
                                    <Plus size={20} />
                                    <span>Add Questions</span>
                                </button>
                            </div>

                            {/* Selected Questions Summary */}
                            <div className="bg-white rounded-lg p-4 border border-indigo-200">
                                <h3 className="text-lg font-medium text-gray-800 mb-2">Selected Questions Summary</h3>
                                <p className="text-sm text-gray-600 mb-4">Total Questions: <span className="text-indigo-600 font-bold">{selectedQuestions.length}</span> | Total Marks: <span className="text-indigo-600 font-bold">{calculateTotalMarks()}</span></p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                                    {Object.entries(questionSummary).map(([subject, data]) => (
                                        <div key={subject} className="bg-white rounded-md p-3 shadow-sm border border-indigo-100">
                                            <p className="font-semibold text-indigo-600">{subject}</p>
                                            <p className="text-gray-700">Count: {data.count}</p>
                                            <p className="text-gray-700">Marks: {data.marks}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => handleSubmit('Save')}
                                className="flex items-center space-x-2 px-6 py-3 bg-white text-gray-800 rounded-md font-semibold hover:bg-indigo-50 transition-colors duration-200 shadow-md border border-indigo-200"
                            >
                                <Save size={20} />
                                <span>Save</span>
                            </button>
                            <button
                                onClick={() => handleSubmit('Publish')}
                                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-700 text-white rounded-md font-semibold hover:from-indigo-700 hover:to-purple-800 transition-colors duration-200 shadow-lg"
                            >
                                <Rocket size={20} />
                                <span>Publish</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Layout - Accordion */}
                <div className="md:hidden">
                    <Accordion title="Exam Details" section="details">
                        <div className="space-y-6">
                            {/* Exam Name */}
                            <div className="flex flex-col">
                                <label htmlFor="exam-name-mobile" className="text-sm font-medium text-gray-600 mb-1">Exam Name</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="exam-name-mobile"
                                        value={examName}
                                        onChange={(e) => setExamName(e.target.value)}
                                        placeholder="e.g., Midterm Exam"
                                        className="w-full p-3 bg-white border border-indigo-200 rounded-md text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 pl-10"
                                    />
                                    <FileText className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                </div>
                            </div>

                            {/* Subject */}
                            <div className="flex flex-col">
                                <label htmlFor="subject-select-mobile" className="text-sm font-medium text-gray-600 mb-1">Subject</label>
                                <div className="relative">
                                    <select
                                        id="subject-select-mobile"
                                        value={selectedSubject}
                                        onChange={(e) => setSelectedSubject(e.target.value)}
                                        className="w-full p-3 bg-white border border-indigo-200 rounded-md text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 appearance-none pr-10 pl-10"
                                    >
                                        <option value="" disabled>Select a subject</option>
                                        {subjects.map(subject => (
                                            <option key={subject.id} value={subject.id}>{subject.name}</option>
                                        ))}
                                    </select>
                                    <Book className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                                </div>
                            </div>

                            {/* Topics (Multi-select) */}
                            <div className="flex flex-col">
                                <label htmlFor="topic-select-mobile" className="text-sm font-medium text-gray-600 mb-1">Topic(s)</label>
                                <div className="relative">
                                    <div className="relative w-full">
                                        <select
                                            id="topic-select-mobile"
                                            multiple
                                            value={selectedTopics}
                                            onChange={(e) => { }}
                                            className="hidden"
                                        >
                                            {filteredTopics.map(topic => (
                                                <option key={topic.id} value={topic.id}>{topic.name}</option>
                                            ))}
                                        </select>
                                        <div className="w-full min-h-[40px] p-2 bg-white border border-indigo-200 rounded-md text-gray-800 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 transition-colors duration-200 flex flex-wrap gap-2 cursor-pointer">
                                            {selectedTopics.length > 0 ? (
                                                selectedTopics.map(topicId => {
                                                    const topic = topics.find(t => t.id === topicId);
                                                    return (
                                                        <div key={topicId} className="flex items-center bg-indigo-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                                                            <span>{topic?.name}</span>
                                                            <button onClick={() => handleTopicChange(topicId)} className="ml-1 text-white hover:text-gray-200">
                                                                <XCircle size={14} />
                                                            </button>
                                                        </div>
                                                    );
                                                })
                                            ) : (
                                                <span className="text-gray-400">Select topics...</span>
                                            )}
                                        </div>
                                        <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg overflow-hidden border border-indigo-200 max-h-48 overflow-y-auto">
                                            {filteredTopics.length > 0 ? (
                                                filteredTopics.map(topic => (
                                                    <div
                                                        key={topic.id}
                                                        className="flex items-center px-4 py-2 cursor-pointer hover:bg-indigo-50 transition-colors duration-200"
                                                        onClick={() => handleTopicChange(topic.id)}
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedTopics.includes(topic.id)}
                                                            readOnly
                                                            className="mr-2 h-4 w-4 text-indigo-500 bg-white border-indigo-200 rounded focus:ring-indigo-500"
                                                        />
                                                        <span className="text-sm text-gray-800">{topic.name}</span>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="p-4 text-gray-400 text-sm">Select a subject first to see topics.</div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Duration */}
                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-gray-600 mb-1">Duration</label>
                                <div className="flex space-x-2 relative items-center">
                                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10" size={20} />
                                    <input
                                        type="number"
                                        value={durationHours}
                                        onChange={(e) => setDurationHours(Math.max(0, parseInt(e.target.value, 10) || 0))}
                                        min="0"
                                        className="w-1/2 p-3 bg-white border border-indigo-200 rounded-md text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 pl-10 pr-2"
                                        placeholder="Hours"
                                    />
                                    <span className="text-gray-400">:</span>
                                    <input
                                        type="number"
                                        value={durationMinutes}
                                        onChange={(e) => setDurationMinutes(Math.min(59, Math.max(0, parseInt(e.target.value, 10) || 0)))}
                                        min="0"
                                        max="59"
                                        className="w-1/2 p-3 bg-white border border-indigo-200 rounded-md text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 pr-2"
                                        placeholder="Minutes"
                                    />
                                </div>
                            </div>

                            {/* Total Marks */}
                            <div className="flex flex-col">
                                <label htmlFor="total-marks-mobile" className="text-sm font-medium text-gray-600 mb-1">Total Marks</label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        id="total-marks-mobile"
                                        value={totalMarks}
                                        onChange={(e) => setTotalMarks(Math.max(0, parseInt(e.target.value, 10) || 0))}
                                        min="0"
                                        className="w-full p-3 bg-white border border-indigo-200 rounded-md text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 pl-10"
                                        placeholder="e.g., 100"
                                    />
                                    <Layers className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                </div>
                            </div>

                            {/* Exam Date & Time */}
                            <div className="flex flex-col">
                                <label htmlFor="exam-datetime-mobile" className="text-sm font-medium text-gray-600 mb-1">Exam Date & Time</label>
                                <div className="relative">
                                    <input
                                        type="datetime-local"
                                        id="exam-datetime-mobile"
                                        value={examDateTime}
                                        onChange={(e) => setExamDateTime(e.target.value)}
                                        className="w-full p-3 bg-white border border-indigo-200 rounded-md text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                                    />
                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                </div>
                            </div>
                        </div>
                    </Accordion>

                    <Accordion title="Question Selection & Summary" section="questions">
                        <div className="flex justify-between items-center mb-4">
                            <p className="text-gray-600 text-sm">Choose questions from the bank.</p>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 transition-colors duration-200 flex items-center space-x-2"
                            >
                                <Plus size={20} />
                                <span>Add</span>
                            </button>
                        </div>
                        <div className="bg-white rounded-lg p-4 border border-indigo-200">
                            <h3 className="text-lg font-medium text-gray-800 mb-2">Summary</h3>
                            <p className="text-sm text-gray-600 mb-4">Total Questions: <span className="text-indigo-600 font-bold">{selectedQuestions.length}</span> | Total Marks: <span className="text-indigo-600 font-bold">{calculateTotalMarks()}</span></p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                                {Object.entries(questionSummary).map(([subject, data]) => (
                                    <div key={subject} className="bg-white rounded-md p-3 shadow-sm border border-indigo-100">
                                        <p className="font-semibold text-indigo-600">{subject}</p>
                                        <p className="text-gray-700">Count: {data.count}</p>
                                        <p className="text-gray-700">Marks: {data.marks}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Accordion>

                    <div className="flex justify-end space-x-4">
                        <button
                            onClick={() => handleSubmit('Save')}
                            className="flex items-center space-x-2 px-6 py-3 bg-white text-gray-800 rounded-md font-semibold hover:bg-indigo-50 transition-colors duration-200 shadow-md border border-indigo-200"
                        >
                            <Save size={20} />
                            <span>Save</span>
                        </button>
                        <button
                            onClick={() => handleSubmit('Publish')}
                            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-700 text-white rounded-md font-semibold hover:from-indigo-700 hover:to-purple-800 transition-colors duration-200 shadow-lg"
                        >
                            <Rocket size={20} />
                            <span>Publish</span>
                        </button>
                    </div>
                </div>

            </div>

            {/* Question Selection Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
                        <div className="flex justify-between items-center p-6 border-b border-indigo-200">
                            <h2 className="text-2xl font-semibold text-indigo-700">Select Questions</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="flex-1 overflow-auto p-6">
                            <div className="flex space-x-2 mb-4">
                                <button
                                    onClick={() => setSelectionMethod('manual')}
                                    className={`px-4 py-2 rounded-md font-semibold transition-colors duration-200 ${selectionMethod === 'manual' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 border border-indigo-200 hover:bg-indigo-50'}`}
                                >
                                    Manual Selection
                                </button>
                                <button
                                    onClick={() => setSelectionMethod('random')}
                                    className={`px-4 py-2 rounded-md font-semibold transition-colors duration-200 ${selectionMethod === 'random' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 border border-indigo-200 hover:bg-indigo-50'}`}
                                >
                                    Random Selection
                                </button>
                            </div>

                            {selectionMethod === 'manual' ? (
                                // Manual Selection UI
                                <div>
                                    <div className="flex flex-wrap items-center space-x-2 mb-4">
                                        <div className="relative flex-1 min-w-[200px] mb-2">
                                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                            <input
                                                type="text"
                                                placeholder="Search questions..."
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                className="w-full p-3 bg-white border border-indigo-200 rounded-md text-gray-800 pl-10 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                            />
                                        </div>
                                        <div className="relative flex-1 min-w-[150px] mb-2">
                                            <select
                                                value={manualFilterSubject}
                                                onChange={(e) => setManualFilterSubject(e.target.value)}
                                                className="w-full p-3 bg-white border border-indigo-200 rounded-md text-gray-800 pr-10 appearance-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                            >
                                                <option value="">All Subjects</option>
                                                {subjects.map(subject => (
                                                    <option key={subject.id} value={subject.id}>{subject.name}</option>
                                                ))}
                                            </select>
                                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                                        </div>
                                    </div>

                                    {/* Question Table */}
                                    <div className="bg-white rounded-lg overflow-x-auto border border-indigo-200">
                                        <table className="min-w-full divide-y divide-indigo-200">
                                            <thead className="bg-indigo-50">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider w-12">Select</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Question Text</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider w-24">Subject</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider w-24">Marks</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider w-24">Level</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-indigo-200">
                                                {questionBank
                                                    .filter(q =>
                                                        q.text.toLowerCase().includes(searchTerm.toLowerCase()) &&
                                                        (manualFilterSubject === '' || q.subjectId === manualFilterSubject) &&
                                                        (manualFilterTopic === '' || q.topicId === manualFilterTopic)
                                                    )
                                                    .map((question) => (
                                                        <tr key={question.id} className="hover:bg-indigo-50 transition-colors duration-200">
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={selectedQuestions.some(q => q.id === question.id)}
                                                                    onChange={() => handleManualQuestionSelection(question)}
                                                                    className="h-4 w-4 text-indigo-600 bg-white border-indigo-200 rounded focus:ring-indigo-500"
                                                                />
                                                            </td>
                                                            <td className="px-6 py-4 max-w-sm truncate text-sm text-gray-700">{question.text}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{subjects.find(s => s.id === question.subjectId)?.name}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{question.marks}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{question.level}</td>
                                                        </tr>
                                                    ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            ) : (
                                // Random Selection UI
                                <div className="space-y-6">
                                    <p className="text-gray-600">Add a set of random questions based on criteria.</p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                        <div className="flex flex-col">
                                            <label htmlFor="random-count" className="text-sm font-medium text-gray-600 mb-1">Number of Questions</label>
                                            <input
                                                type="number"
                                                id="random-count"
                                                value={randomCount}
                                                onChange={(e) => setRandomCount(Math.max(1, parseInt(e.target.value, 10) || 1))}
                                                min="1"
                                                className="w-full p-3 bg-white border border-indigo-200 rounded-md text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="random-subject" className="text-sm font-medium text-gray-600 mb-1">Subject</label>
                                            <select
                                                id="random-subject"
                                                value={randomSubject}
                                                onChange={(e) => setRandomSubject(e.target.value)}
                                                className="w-full p-3 bg-white border border-indigo-200 rounded-md text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none pr-10"
                                            >
                                                <option value="">Any</option>
                                                {subjects.map(subject => (
                                                    <option key={subject.id} value={subject.id}>{subject.name}</option>
                                                ))}
                                            </select>
                                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="random-topic" className="text-sm font-medium text-gray-600 mb-1">Topic</label>
                                            <select
                                                id="random-topic"
                                                value={randomTopic}
                                                onChange={(e) => setRandomTopic(e.target.value)}
                                                className="w-full p-3 bg-white border border-indigo-200 rounded-md text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none pr-10"
                                            >
                                                <option value="">Any</option>
                                                {topics.filter(t => !randomSubject || t.subjectId === randomSubject).map(topic => (
                                                    <option key={topic.id} value={topic.id}>{topic.name}</option>
                                                ))}
                                            </select>
                                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="random-level" className="text-sm font-medium text-gray-600 mb-1">Level</label>
                                            <select
                                                id="random-level"
                                                value={randomLevel}
                                                onChange={(e) => setRandomLevel(e.target.value)}
                                                className="w-full p-3 bg-white border border-indigo-200 rounded-md text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none pr-10"
                                            >
                                                <option value="">Any</option>
                                                <option value="Easy">Easy</option>
                                                <option value="Medium">Medium</option>
                                                <option value="Hard">Hard</option>
                                            </select>
                                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex justify-end space-x-4 p-6 border-t border-indigo-200">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-6 py-3 bg-white text-gray-800 rounded-md font-semibold hover:bg-indigo-50 transition-colors duration-200 border border-indigo-200"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddQuestions}
                                className="px-6 py-3 bg-indigo-600 text-white rounded-md font-semibold hover:bg-indigo-700 transition-colors duration-200"
                            >
                                Add Questions
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
