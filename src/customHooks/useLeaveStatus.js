import { useState } from "react";
import { useDispatch } from "react-redux";
import { leaveService } from "../services/apiService";
import { updateLeaveStatus } from "../utils/store/leaveSlice";


export const useLeaveStatus = () => {
    const dispatch = useDispatch();
    const [loadingId, setLoadingId] = useState(null);

    const updateStatus = async ({ id, status, reason = "" }) => {
        try {
            setLoadingId(id);

            const res = await leaveService.updateLeaveStatus(id, status, reason);

            dispatch(updateLeaveStatus(res.data));
        } catch (err) {
            console.error("Status update failed", err);
            alert("Failed to update status");
        } finally {
            setLoadingId(null);
        }
    };

    return { updateStatus, loadingId };
};
