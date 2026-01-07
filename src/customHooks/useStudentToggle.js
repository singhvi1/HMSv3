import { useDispatch } from "react-redux";
import { studentService } from "../services/apiService";
import toast from "react-hot-toast";
import { setStudentStatus } from "../utils/store/studentSlice";

const useStudentToggle = () => {
    const dispatch = useDispatch();

    const toggleStudentFxn = async (id, status) => {
        const action = status === "active" ? "Inactive" : "Active";
        const confirmMsg = status === "active" ? "Deactivate this Student" : "Activate this Student";

        if (!window.confirm(confirmMsg)) return;
        try {
            const res = await studentService.toogleStudentStatus(id);
            dispatch(setStudentStatus(res.data.data))
            toast.success(`student profile successfuly ${action}d`)
        } catch (err) {
            console.log("not able toggle stduent status", err);
            toast.error(err.response?.data?.message || "Action failed");
        }

    }
    return { toggleStudentFxn }
}


export default useStudentToggle
