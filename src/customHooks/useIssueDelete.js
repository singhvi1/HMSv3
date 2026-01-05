import React from 'react'
import { useDispatch } from 'react-redux';
import { issueService } from '../services/apiService';
import toast from 'react-hot-toast';
import { removeOneIssue } from '../utils/store/issuesSlice';

const useIssueDelete = () => {
    const dispatch = useDispatch();


    const deleteIssueFxn = async (id) => {
        if (!window.confirm("Are you sure !! ")) return;
        try {
            const res = await issueService.deleteIssue(id)
            dispatch(removeOneIssue(id))
            toast.success(res.message || "Issue delted SuccessFully")
            return true;
        } catch (err) {
            console.log("Not able to delete Issue Contact to vikash", err)
            return false;
        }
    }
    return (deleteIssueFxn)
}

export default useIssueDelete;
