import { useState } from "react";
import Modal from "./shared/modal";
import { apiFetcher } from "@/utils/fetcher";
import { usePathname, useRouter } from "next/navigation";
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

export default LogoutButton;