'use client';

import CustomModal from '@/components/shared/custom-modal';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

const initialSubjects = [];

const initialTopics = {};

const PlusIcon = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
);


// --- Main Question Create Form Component ---
export default function QuestionCreateForm() {
    const [subjectId, setSubjectId] = useState('');
    const [topicId, setTopicId] = useState('');
    const [questionText, setQuestionText] = useState('');
    const [options, setOptions] = useState({ A: '', B: '', C: '', D: '' });
    const [correctAnswer, setCorrectAnswer] = useState('');

    // State for dynamic data (subjects and topics)
    const [subjects, setSubjects] = useState(initialSubjects);
    const [topics, setTopics] = useState({});
    const [availableTopics, setAvailableTopics] = useState([]);

    // Modal state
    const [isSubjectModalOpen, setIsSubjectModalOpen] = useState(false);
    const [isTopicModalOpen, setIsTopicModalOpen] = useState(false);
    const [newSubjectName, setNewSubjectName] = useState('');
    const [newTopicName, setNewTopicName] = useState('');

    // Effect to update available topics when a subject is selected
    useEffect(() => {
        if (subjectId) {
            setAvailableTopics(initialTopics[subjectId] || []);
            setTopicId(''); // Reset topic when subject changes
        } else {
            setAvailableTopics([]);
        }
    }, [subjectId]);

    // --- HANDLERS ---

    const handleOptionChange = (optionKey, value) => {
        setOptions(prev => ({ ...prev, [optionKey]: value }));
    };

    const handleSaveSubject = () => {
        if (newSubjectName.trim()) {
            const newSubject = { id: `sub-${Date.now()}`, name: newSubjectName.trim() };
            setSubjects(prev => [...prev, newSubject]);
            setSubjectId(newSubject.id); // Auto-select the new subject
            setNewSubjectName('');
            setIsSubjectModalOpen(false);
        }
    };

    const handleSaveTopic = () => {
        if (newTopicName.trim() && subjectId) {
            const newTopic = { id: `top-${Date.now()}`, name: newTopicName.trim() };
            if (!initialTopics[subjectId]) initialTopics[subjectId] = [];
            initialTopics[subjectId].push(newTopic);

            setAvailableTopics([...initialTopics[subjectId]]);
            setTopicId(newTopic.id); // Auto-select the new topic
            setNewTopicName('');
            setIsTopicModalOpen(false);
        } else if (!subjectId) {
            // In a real app, you would use a more robust notification system
            console.error("Please select a subject before adding a topic.");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Basic validation
        if (!questionText || !options.A || !options.B || !options.C || !options.D || !correctAnswer || !subjectId) {
            console.error("Please fill all required fields.");
            // Here you would show an error message to the user
            return;
        }

        const formData = {
            subjectId,
            topicId, // Can be optional
            questionText,
            optionOne: options.A,
            optionTwo: options.B,
            optionThree: options.C,
            optionFour: options.D,
            correctAnswer,
        };

        console.log("Form Submitted:", formData);
    };

    return (
        <>
            <div className=" p-4">
                <div className="mx-auto">
                    <header className='flex flex-row justify-between items-center mb-4'>
                        <h1 className="text-2xl font-bold text-gray-800">Create a New Question</h1>
                        <Link href={'/teacher/questions'}>
                            <button type="button" className="px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all">
                                Question Bank
                            </button>
                        </Link>
                    </header>
                    <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-xl shadow-lg space-y-8">
                        <div className="grid grid-cols-1 gap-8">
                            <div className="space-y-6">
                                <h2 className="text-xl font-semibold text-gray-700 border-b border-b-gray-300 pb-2">Question Details</h2>
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                                    {/* Subject */}
                                    <div>
                                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                                        <div className="flex items-center space-x-2">
                                            <select id="subject" value={subjectId} onChange={(e) => setSubjectId(e.target.value)} className="flex-grow p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                                                <option value="">Select a subject</option>
                                                {subjects.map(sub => (
                                                    <option key={sub.id} value={sub.id}>{sub.name}</option>
                                                ))}
                                            </select>
                                            <button type="button" onClick={() => setIsSubjectModalOpen(true)} className="p-2 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 transition-colors">
                                                <PlusIcon className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Topic */}
                                    <div>
                                        <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-1">Topic (Optional)</label>
                                        <div className="flex items-center space-x-2">
                                            <select id="topic" value={topicId} onChange={(e) => setTopicId(e.target.value)} disabled={!subjectId} className="flex-grow p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100">
                                                <option value="">Select a topic</option>
                                                {availableTopics.map(top => (
                                                    <option key={top.id} value={top.id}>{top.name}</option>
                                                ))}
                                            </select>
                                            <button type="button" onClick={() => setIsTopicModalOpen(true)} disabled={!subjectId} className="p-2 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 transition-colors disabled:bg-gray-200 disabled:text-gray-400">
                                                <PlusIcon className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            {/* Right Column: Question Content */}
                            <div className="space-y-6">
                                <h2 className="text-xl font-semibold text-gray-700 border-b border-b-gray-300 pb-2">Question & Answers</h2>

                                {/* Question Text */}
                                <div>
                                    <label htmlFor="questionText" className="block text-sm font-medium text-gray-700 mb-1">Question Text</label>
                                    <textarea id="questionText" value={questionText} onChange={(e) => setQuestionText(e.target.value)} rows="4" className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="Enter the question here..."></textarea>
                                </div>

                                {/* Options */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {Object.keys(options).map(key => (
                                        <div key={key}>
                                            <label htmlFor={`option-${key}`} className="block text-sm font-medium text-gray-700 mb-1">Option {key}</label>
                                            <input type="text" id={`option-${key}`} value={options[key]} onChange={(e) => handleOptionChange(key, e.target.value)} className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder={`Enter text for option ${key}`} />
                                        </div>
                                    ))}
                                </div>

                                {/* Correct Answer Selection */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Correct Answer</label>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                        {Object.keys(options).map(key => (
                                            <div key={key} className="flex items-center">
                                                <input
                                                    id={`correct-answer-${key}`}
                                                    name="correctAnswer"
                                                    type="radio"
                                                    value={key}
                                                    checked={correctAnswer === key}
                                                    onChange={(e) => setCorrectAnswer(e.target.value)}
                                                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                                />
                                                <label htmlFor={`correct-answer-${key}`} className="ml-2 block text-sm text-gray-900 truncate" title={options[key] || `Option ${key}`}>
                                                    {options[key] || `Option ${key}`}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Form Submission Button */}
                        <div className="pt-6 border-t border-t-gray-300 mt-8 flex justify-end">
                            <button type="submit" className="px-6 py-2.5 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all">
                                Save Question
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Modals for adding new Subject and Topic */}
            <CustomModal
                isOpen={isSubjectModalOpen}
                onClose={() => setIsSubjectModalOpen(false)}
                title="Add New Subject"
                onSave={handleSaveSubject}
            >
                <div>
                    <label htmlFor="new-subject" className="block text-sm font-medium text-gray-700 mb-1">Subject Name</label>
                    <input
                        type="text"
                        id="new-subject"
                        value={newSubjectName}
                        onChange={(e) => setNewSubjectName(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., Biology"
                    />
                </div>
            </CustomModal>

            <CustomModal
                isOpen={isTopicModalOpen}
                onClose={() => setIsTopicModalOpen(false)}
                title="Add New Topic"
                onSave={handleSaveTopic}
            >
                <div>
                    <label htmlFor="new-topic" className="block text-sm font-medium text-gray-700 mb-1">Topic Name</label>
                    <input
                        type="text"
                        id="new-topic"
                        value={newTopicName}
                        onChange={(e) => setNewTopicName(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., Photosynthesis"
                    />
                </div>
            </CustomModal>
        </>
    );
}
