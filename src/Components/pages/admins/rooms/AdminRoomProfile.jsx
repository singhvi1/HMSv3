import { useLocation, useParams } from "react-router-dom";
import ProfileHero from "../../../profile/ProfileHero";
import AdminStudentActions from "./AdminStudentActions";

import { rooms, students } from "../../../../../data";

const AdminStudentProfile = () => {
  const { roomId } = useParams();
  const location = useLocation();
  const studentFromState = location.state?.room;
  console.log(studentFromState);
  // Use student from state if available, otherwise fallback to finding by ID
  const student = studentFromState || rooms.find((s) => s._id === roomId); //or later from API/redux

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
