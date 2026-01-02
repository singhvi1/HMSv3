import { InfoItem, ProfileHeader } from '../../../../common/ui/ProfileComponents';
import { useParams } from 'react-router-dom';
import { selectStudentById, setStudent } from '../../../../../utils/store/studentSlice';
import { useDispatch, useSelector } from 'react-redux';
import AdminStudentActions from './AdminStudentActions';
import BackButton from '../../../../common/ui/Backbutton';
import { studentService } from '../../../../../services/apiService';
import { useEffect } from 'react';

const AdminStudentProfile = () => {
    const { id } = useParams();
    const dispatch = useDispatch()
    const student = useSelector(selectStudentById(id));
    // console.log(student, "this is student passed to admin student Profile")
    // console.log(student?.user_id?.status, "error that we getting ")
    const fetchStudent = async () => {
        try {
            const res = await studentService.getStudentById(id)
            dispatch(setStudent(res.data.student))
        } catch (error) {
            console.log("Not able to fetch student", error)
        }
    }
    useEffect(() => {
        if (!student) {
            fetchStudent();
        }
    }, [id])
    return (
        <div>
            <BackButton />
            <ProfileHeader student={student} InfoItem={InfoItem} />
            <AdminStudentActions student={student} />
            <h1>Leave request </h1>
            <h1>Maintainace requests</h1>
            <h1>Disciplinary Actions</h1>
        </div>
    )
}

export default AdminStudentProfile
