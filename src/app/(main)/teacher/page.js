
import PracticeMode from "@/components/dashboard/practice-mode";
import ProfileProgress from "@/components/dashboard/profile-progress";
import ResultsHistory from "@/components/dashboard/results-history";
import UpcomingExams from "@/components/dashboard/upcoming-exams";
import TeacherDashboard from "@/components/teacher-dashboard";
import ExamManagement from "@/components/teacher-dashboard/exam-management";
import RecentActivity from "@/components/teacher-dashboard/recent-activity";
import StatCards from "@/components/teacher-dashboard/state-card";

const DashboardPage = () => {
    return (
        <>
            <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6">
                <StatCards />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <ExamManagement />
                    <RecentActivity />
                </div>
            </main>

        </>
    );
};

export default DashboardPage;