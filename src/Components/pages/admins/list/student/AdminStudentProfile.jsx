import { InfoItem, ProfileHeader } from '../../../../common/ui/ProfileComponents';
import { useParams } from 'react-router-dom';
import { selectStudentById } from '../../../../../utils/store/studentSlice';
import { useSelector } from 'react-redux';
import AdminStudentActions from './AdminStudentActions';
import BackButton from '../../../../common/ui/Backbutton';

const AdminStudentProfile = () => {
    const { id } = useParams();
    console.log(id);
    const student = useSelector(selectStudentById(id));
    console.log(student)
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
