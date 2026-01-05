import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectLeaveItems, selectLeavePageData, setLeaveList, setLeavePage, } from '../../../../utils/store/leaveSlice';
import Table from '../../../common/table/Table';
import Pagination from '../../../common/table/Pagination';
import { leaveColumns } from '../../../../../MockData';
import { leaveService } from '../../../../services/apiService';
import { useLeaveStatus } from '../../../../customHooks/useLeaveStatus';
import { useNavigate } from 'react-router-dom';

const LeaveList = ({ studentId }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    console.log(studentId);
    const items = useSelector(selectLeaveItems);
    const { page, limit, pages } = useSelector(selectLeavePageData)
    const [loading, setLoading] = useState(false)
    const { updateStatus } = useLeaveStatus()

    const fetchLeave = useCallback(async () => {
        try {
            setLoading(true);
            const res = await leaveService.getStudentAllLeaves({
                studentId,
                page,
                limit,
            })
            console.log(res)
            dispatch(setLeaveList(res.data))
        } catch (err) {
            console.log(err, "Not able to fetch leave Request")
        } finally {
            setLoading(false)
        }
    }, [dispatch, limit, page, studentId])

    useEffect(() => {
        fetchLeave()
    }, [fetchLeave])

    if (loading) {
        return <h2>this is loading please Wait</h2>
    }
    return (
        <div className='bg-white rounded-xl shadow p-6'>
            <Table
                columns={leaveColumns(updateStatus,navigate, )}
                data={items}
            />
            <Pagination
                currPage={page}
                onPageChange={(p) => dispatch(setLeavePage(p))} totalPages={pages}
            />

        </div>
    )
}

export default LeaveList
