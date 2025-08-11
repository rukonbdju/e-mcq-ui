import { useState } from "react";
import Modal from "./shared/modal";
import { apiFetcher } from "@/utils/fetcher";
import { useRouter } from "next/navigation";

const Sidebar = ({ isOpen }) => (
    <aside className={`sidebar absolute md:relative w-64 h-full bg-white shadow-md flex-shrink-0 z-30 flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="m-4 p-4 rounded-2xl bg-blue-600 text-gray-50">
            <a href="#" className="flex items-center space-x-2 text-2xl font-bold">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
                <span>e-Exams</span>
            </a>
        </div>
        <nav className="flex-1 mt-4">
            <a href="#" className="flex items-center px-6 py-3 text-slate-700 bg-slate-100 font-semibold border-r-4 border-indigo-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3"><rect width="7" height="9" x="3" y="3" rx="1" /><rect width="7" height="5" x="14" y="3" rx="1" /><rect width="7" height="9" x="14" y="12" rx="1" /><rect width="7" height="5" x="3" y="16" rx="1" /></svg>
                Home
            </a>
            <a href="#" className="flex items-center px-6 py-3 text-slate-600 hover:bg-slate-50 hover:font-semibold">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3"><path d="M15.5 2H8.6c-.4 0-.8.2-1.1.5-.3.3-.5.7-.5 1.1V21c0 .8.7 1.5 1.5 1.5h8c.8 0 1.5-.7 1.5-1.5V6.4c0-.4-.2-.8-.5-1.1l-2.8-2.8z" /><path d="M15.5 2v4.5h4.5" /></svg>
                Exams
            </a>
            <a href="#" className="flex items-center px-6 py-3 text-slate-600 hover:bg-slate-50 hover:font-semibold">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                Results
            </a>
            <a href="#" className="flex items-center px-6 py-3 text-slate-600 hover:bg-slate-50 hover:font-semibold">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3"><path d="m12 14 4-4" /><path d="M12 14V2" /><path d="M12 14v8" /><path d="M12 14H4" /><path d="M12 5V2" /><path d="M12 19v3" /><path d="m19 12-3-3 3-3" /><path d="m5 12 3 3-3 3" /></svg>
                Practice
            </a>
        </nav>
        <LogoutButton />
    </aside>
);
export default Sidebar;

const LogoutButton = () => {
    const router = useRouter()
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    // Function to simulate the logout action.
    const handleConfirmLogout = async () => {
        try {
            const result = await apiFetcher('/auth/logout', { method: 'post' })
            console.log(result)
            if (result.success) {
                router.push('/')
            }
        } catch (error) {
            console.log(error)
        }
        handleCloseModal();
    };
    return (
        <div className="p-6 border-t border-t-gray-300">
            <button onClick={handleOpenModal} type="button" className="flex items-center px-4 py-3 w-full justify-center text-red-600 hover:bg-red-50 border border-red-500 hover:font-semibold rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
                Logout
            </button>
            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleConfirmLogout}
                title="Confirm Logout"
                message="Are you sure you want to log out of your account? You will need to sign in again."
                confirmText="Logout"
            />
        </div>
    )
}