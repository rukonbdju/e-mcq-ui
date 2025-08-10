
import PracticeMode from "@/components/dashboard/practice-mode";
import ProfileProgress from "@/components/dashboard/profile-progress";
import ResultsHistory from "@/components/dashboard/results-history";
import UpcomingExams from "@/components/dashboard/upcoming-exams";
import TeacherDashboard from "@/components/teacher-dashboard";

const DashboardPage = () => {
    return (
        <>
            <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <UpcomingExams />
                        <ResultsHistory />
                    </div>
                    <div className="space-y-6">
                        <ProfileProgress />
                        <PracticeMode />
                    </div>
                </div>
                <TeacherDashboard />
            </main>

        </>
    );
};

export default DashboardPage;