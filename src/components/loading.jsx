const Loading = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-4">
                {/* Spinner */}
                <svg
                    className="h-12 w-12 animate-spin text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                >
                    <circle
                        className="opacity-20"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    <path
                        className="opacity-100"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                </svg>

                {/* Animated dots */}
                <div className="flex space-x-2">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-white"></span>
                    <span className="h-2 w-2 animate-bounce rounded-full bg-white [animation-delay:-0.15s]"></span>
                    <span className="h-2 w-2 animate-bounce rounded-full bg-white [animation-delay:-0.3s]"></span>
                </div>
            </div>
        </div>

    )
}

export default Loading;