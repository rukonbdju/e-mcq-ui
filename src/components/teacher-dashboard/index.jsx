import ExamManagement from "./exam-management";
import RecentActivity from "./recent-activity";
import StatCards from "./state-card";


const TeacherDashboard = () => {
    return (
        <div className="mt-6">
            <StatCards />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <ExamManagement />
                <RecentActivity />
            </div>
        </div>
    );
};
export default TeacherDashboard;