import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { studentService } from "../services/apiService";
import { removeStudent } from "../utils/store/studentSlice";
import toast from "react-hot-toast";

const useStudentDelete = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    
    const deleteStudent = async ({ userId }) => {
        console.log(userId, "in deleteHook")
        const confirmMsg = "Are you sure ! "
        if (!window.confirm(confirmMsg)) return;


        try {
            const res = await studentService.deleteStudent(userId);
            // console.log(res.data);
            dispatch(removeStudent(userId));
            toast.success(`Student successfully Deleted`)
            navigate(`/admin/students`)
        } catch (err) {
            console.log("Not able to delete Contact to Developer Vikash", err)
            toast.error("Not able to delete Studetn contact Vikash")
        }
    }
    return { deleteStudent };
}


export default useStudentDelete;