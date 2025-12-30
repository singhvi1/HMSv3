import { useParams } from "react-router-dom";
import ProfileHero from "../../../profile/ProfileHero";
import AdminStudentActions from "./AdminStudentActions";

import { students } from "../../../../../data";

const AdminStudentProfile = () => {
    const { id } = useParams();


    console.log(id)
    // Use student from state if available, otherwise fallback to finding by ID
    const student = students.find(s => s._id === id); //or later from API/redux

    if (!student) {
        return <p className="p-6 text-red-500">Student not found</p>;
    }

    return (
        <div className="p-6 space-y-6">
            {/* Student basic info */}
            <ProfileHero student={student} />

            {/* Admin actions */}
            <AdminStudentActions student={student} />
        </div>
    );
};

export default AdminStudentProfile;
