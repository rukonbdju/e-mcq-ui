const Header = ({ onMenuClick }) => (
    <header className="flex sticky top-0 z-10 items-center justify-between p-4 bg-white border-b border-slate-300">
        <div className="flex items-center">
            < button onClick={onMenuClick} className="text-slate-500 focus:outline-none md:hidden mr-4" >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button >
            <h1 className="text-xl font-semibold text-slate-800">Dashboard</h1>
        </div >
        <div className="flex items-center space-x-4">
            <a href="#" className="flex items-center space-x-2 text-slate-600 hover:text-indigo-600">
                <img src="https://placehold.co/40x40/E0E7FF/4338CA?text=JS" alt="Jordan Smith" className="w-10 h-10 rounded-full border-2 border-white shadow" />
                <span className="font-semibold text-sm hidden sm:block">Jordan Smith</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="hidden sm:block"><path d="m6 9 6 6 6-6" /></svg>
            </a>
        </div>
    </header >
);

export default Header;