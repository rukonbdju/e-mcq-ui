
import Link from "next/link";

import { Home, BookOpen, FileText, Users, BarChart, Settings, HelpCircle, User, Trophy, UserCog } from "lucide-react";
import { usePathname } from "next/navigation";
import LogoutButton from "./logout-button";

const teacherMenu = [
    { label: "Dashboard", icon: <Home />, path: "/teacher" },
    { label: "Create Question", icon: <BookOpen />, path: "/teacher/questions/create" },
    { label: "Question Bank", icon: <BookOpen />, path: "/teacher/questions" },
    { label: "Create Exam", icon: <FileText />, path: "/teacher/exams/create" },
    { label: "Manage Exams", icon: <FileText />, path: "/teacher/exams" },
    { label: "Live Exams", icon: <FileText />, path: "/teacher/exams/live" },
    { label: "Performance", icon: <Users />, path: "/teacher/students/performance" },
    { label: "Exam Results", icon: <BarChart />, path: "/teacher/reports/results" },
    { label: "Leaderboard", icon: <BarChart />, path: "/teacher/reports/leaderboard" },
    { label: "Settings", icon: <Settings />, path: "/teacher/settings" },
];

const studentMenu = [
    { label: "Dashboard", icon: <Home />, path: "/student/dashboard" },
    { label: "My Exams", icon: <FileText />, path: "/student/exams" },
    { label: "Start Exam", icon: <FileText />, path: "/student/exams/start" },
    { label: "Results", icon: <BarChart />, path: "/student/results" },
    { label: "Performance", icon: <BarChart />, path: "/student/performance" },
    { label: "Leaderboard", icon: <Trophy />, path: "/student/leaderboard" },
    { label: "Profile", icon: <User />, path: "/student/profile" },
    { label: "Support", icon: <HelpCircle />, path: "/student/support" },
];

const adminMenu = [
    { label: "Dashboard", icon: <Home />, path: "/admin/dashboard" },
    { label: "Manage Teachers", icon: <UserCog />, path: "/admin/teachers" },
    { label: "Manage Students", icon: <Users />, path: "/admin/students" },
    { label: "Manage Exams", icon: <FileText />, path: "/admin/exams" },
    { label: "Question Bank", icon: <BookOpen />, path: "/admin/questions" },
    { label: "Reports", icon: <BarChart />, path: "/admin/reports" },
];

const Sidebar = ({ isOpen }) => {
    const pathname = usePathname()
    console.log(pathname)
    return (
        <aside className={`sidebar absolute md:relative w-64 h-full bg-white shadow-md flex-shrink-0 z-30 flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
            <div className="m-4 p-4 rounded-2xl bg-blue-600 text-gray-50">
                <a href="#" className="flex items-center space-x-2 text-2xl font-bold">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
                    <span>e-Exams</span>
                </a>
            </div>
            <nav className="flex-1 mt-4">
                {teacherMenu.map((item) => (
                    <Link
                        key={item.label}
                        href={item.path}
                        className={`flex items-center px-6 py-3 text-slate-700 ${pathname === item.path ? "bg-slate-100 font-semibold border-r-4 border-indigo-600" : ""} `}
                    >
                        <span className="mr-3">{item.icon}</span>
                        <span>{item.label}</span>
                    </Link>
                ))}
            </nav>
            <LogoutButton />
        </aside>
    )
};
export default Sidebar;