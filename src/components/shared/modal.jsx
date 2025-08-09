"use client";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

const Modal = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = "Confirm",
    cancelText = "Cancel",
}) => {
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
                <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-md">
                    {/* Title & Message */}
                    <div className="text-center mb-4">
                        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
                        <p className="text-sm text-gray-600 mt-2">{message}</p>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end space-x-3">
                        <button
                            onClick={handleClose}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                        >
                            {cancelText}
                        </button>

                        <button
                            onClick={onConfirm}
                            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        >
                            {confirmText}
                        </button>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default Modal;
