import { useLocation, useParams } from "react-router-dom";
import { rooms } from "../../../../../data";
import ProfileHero from "../../../profile/ProfileHero";
import { useSelector } from "react-redux";
import AdminStudentActions from "../list/student/AdminStudentActions";


const AdminRoomProfile = () => {
    const { roomId } = useParams();
    const location = useLocation();
    const loggedinUser=useSelector(state=>state.loggedinUser);
    const roomFromState = location.state?.room;
    // console.log("AdminroomData",roomFromState);
    // Use student from state if available, otherwise fallback to finding by ID
    const student = roomFromState ||
        rooms.find(s => s._id === roomId); //or later from API/redux

    if (!student) {
        return <p className="p-6 text-red-500">Student not found</p>;
    }

    return (
        <div className="p-6 space-y-6">
            {/* Student basic info */}
            <ProfileHero student={loggedinUser} />

            {/* Admin actions */}
            <AdminStudentActions student={student} />
        </div>
    );
};

export default AdminRoomProfile;
