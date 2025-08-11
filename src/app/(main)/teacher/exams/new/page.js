'use client'

import { useState } from "react";

const Toggle = ({ label, enabled, setEnabled }) => (
    <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-700">{label}</span>
        <button
            type="button"
            className={`${enabled ? 'bg-teal-600' : 'bg-slate-200'} relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2`}
            onClick={() => setEnabled(!enabled)}
        >
            <span className={`${enabled ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`} />
        </button>
    </div>
);

const QuestionBuilder = ({ question, index, updateQuestion, removeQuestion }) => {
    const handleOptionChange = (optionIndex, value) => {
        const newOptions = [...question.options];
        newOptions[optionIndex] = value;
        updateQuestion(index, { ...question, options: newOptions });
    };

    return (
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
            <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-slate-700">Question {index + 1}</label>
                <button type="button" onClick={() => removeQuestion(index)} className="text-sm font-medium text-red-600 hover:text-red-800">Remove</button>
            </div>
            <textarea
                value={question.text}
                onChange={(e) => updateQuestion(index, { ...question, text: e.target.value })}
                placeholder="Enter the question text..."
                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                rows="2"
            ></textarea>
            <div className="mt-4">
                <label className="block text-sm font-medium text-slate-700 mb-1">Options</label>
                <div className="space-y-2">
                    {question.options.map((option, optionIndex) => (
                        <div key={optionIndex} className="flex items-center gap-2">
                            <input
                                type="radio"
                                name={`correct-answer-${index}`}
                                checked={question.correctAnswer === optionIndex}
                                onChange={() => updateQuestion(index, { ...question, correctAnswer: optionIndex })}
                                className="h-4 w-4 text-teal-600 border-slate-300 focus:ring-teal-500"
                            />
                            <input
                                type="text"
                                value={option}
                                onChange={(e) => handleOptionChange(optionIndex, e.target.value)}
                                placeholder={`Option ${optionIndex + 1}`}
                                className="block w-full rounded-md border-slate-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const CreateExamPage = () => {
    const [shuffleQuestions, setShuffleQuestions] = useState(true);
    const [instantFeedback, setInstantFeedback] = useState(false);
    const [questions, setQuestions] = useState([
        { text: '', options: ['', '', '', ''], correctAnswer: 0 }
    ]);

    const addQuestion = () => {
        setQuestions([...questions, { text: '', options: ['', '', '', ''], correctAnswer: 0 }]);
    };

    const updateQuestion = (index, updatedQuestion) => {
        const newQuestions = [...questions];
        newQuestions[index] = updatedQuestion;
        setQuestions(newQuestions);
    };

    const removeQuestion = (index) => {
        const newQuestions = questions.filter((_, qIndex) => qIndex !== index);
        setQuestions(newQuestions);
    };

    return (
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6">
            <div className="max-w-4xl mx-auto">
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="space-y-8">
                        {/* Section 1: Exam Details */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border">
                            <h3 className="text-lg font-semibold text-slate-800 mb-1">Exam Details</h3>
                            <p className="text-sm text-slate-500 mb-6">Provide the basic information for your exam.</p>
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-6">
                                <div className="sm:col-span-6">
                                    <label htmlFor="exam-title" className="block text-sm font-medium text-slate-700">Exam Title</label>
                                    <input type="text" name="exam-title" id="exam-title" className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm" placeholder="e.g., Modern Physics - Midterm" />
                                </div>
                                <div className="sm:col-span-6">
                                    <label htmlFor="description" className="block text-sm font-medium text-slate-700">Description / Instructions</label>
                                    <textarea id="description" name="description" rows="3" className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm" placeholder="Add instructions for students..."></textarea>
                                </div>
                                <div className="sm:col-span-3">
                                    <label htmlFor="subject" className="block text-sm font-medium text-slate-700">Subject</label>
                                    <input type="text" name="subject" id="subject" className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm" placeholder="e.g., Physics" />
                                </div>
                                <div className="sm:col-span-3">
                                    <label htmlFor="date-time" className="block text-sm font-medium text-slate-700">Start Date & Time</label>
                                    <input type="datetime-local" name="date-time" id="date-time" className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm" />
                                </div>
                                <div className="sm:col-span-3">
                                    <label htmlFor="duration" className="block text-sm font-medium text-slate-700">Duration (minutes)</label>
                                    <input type="number" name="duration" id="duration" defaultValue="60" className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm" />
                                </div>
                                <div className="sm:col-span-3">
                                    <label htmlFor="marks" className="block text-sm font-medium text-slate-700">Total Marks</label>
                                    <input type="number" name="marks" id="marks" defaultValue="100" className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm" />
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Settings */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border">
                            <h3 className="text-lg font-semibold text-slate-800 mb-1">Settings</h3>
                            <p className="text-sm text-slate-500 mb-6">Configure the behavior of the exam.</p>
                            <div className="space-y-4">
                                <Toggle label="Shuffle Questions" enabled={shuffleQuestions} setEnabled={setShuffleQuestions} />
                                <Toggle label="Show Instant Feedback" enabled={instantFeedback} setEnabled={setInstantFeedback} />
                            </div>
                        </div>

                        {/* Section 3: Questions */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border">
                            <h3 className="text-lg font-semibold text-slate-800 mb-1">Questions</h3>
                            <p className="text-sm text-slate-500 mb-6">Build your exam by adding questions and options.</p>
                            <div className="space-y-6">
                                {questions.map((q, index) => (
                                    <QuestionBuilder key={index} question={q} index={index} updateQuestion={updateQuestion} removeQuestion={removeQuestion} />
                                ))}
                            </div>
                            <button type="button" onClick={addQuestion} className="mt-6 flex items-center gap-2 px-4 py-2 border border-dashed border-slate-300 text-sm font-medium rounded-md text-slate-700 hover:bg-slate-50">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                                Add Another Question
                            </button>
                        </div>
                    </div>

                    {/* Form Actions */}
                    <div className="mt-8 flex justify-end gap-4">
                        <button type="button" className="px-6 py-2 bg-white border border-slate-300 text-sm font-semibold rounded-lg shadow-sm hover:bg-slate-50">Save as Draft</button>
                        <button type="submit" className="px-6 py-2 bg-teal-600 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-teal-700">Create & Publish Exam</button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default CreateExamPage