"use client";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
const XIcon = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);
const CustomModal = ({ isOpen, onClose, title, onSave, children }) => {
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsAnimating(true);
        } else {
            const timer = setTimeout(() => setIsAnimating(false), 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!isOpen && !isAnimating) return null;

    const handleClose = () => {
        setIsAnimating(false);
        setTimeout(() => onClose(), 300);
    };

    return createPortal(
        <div
            className={`fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-300 ${isAnimating ? "bg-black/60" : "bg-black/0"
                }`}
            onClick={handleClose}
        >
            <div
                className={`transform transition-all duration-300 ease-out w-full h-full flex items-center justify-center px-4 ${isAnimating
                    ? "translate-y-0 opacity-100"
                    : "translate-y-12 opacity-0"
                    }`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                    <div className="p-4 border-b flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
                            <XIcon className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="p-6">
                        {children}
                    </div>
                    <div className="p-4 bg-gray-50 border-t flex justify-end space-x-2">
                        <button onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors">
                            Cancel
                        </button>
                        <button onClick={onSave} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default CustomModal;
