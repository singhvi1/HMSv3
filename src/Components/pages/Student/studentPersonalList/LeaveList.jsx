import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectAllLeaveState, selectLeavePageData, setLeaveError, setLeaveList, setLeavePage, } from '../../../../utils/store/leaveSlice';
import PageLoader from "../../../common/PageLoader"
import Table from '../../../common/table/Table';
import Pagination from '../../../common/table/Pagination';
import { leaveColumns } from '../../../../../MockData';
import { leaveService } from '../../../../services/apiService';
import { useLeaveStatus } from '../../../../customHooks/useLeaveStatus';
import { useNavigate } from 'react-router-dom';

const LeaveList = ({ studentId }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // console.log(studentId);
    const { items, loading, error, } = useSelector(selectAllLeaveState);
    const { page, limit, pages } = useSelector(selectLeavePageData)
    const { updateStatus } = useLeaveStatus()

    const fetchLeave = useCallback(async () => {
        try {
            const res = await leaveService.getStudentAllLeaves({
                studentId,
                page,
                limit,
            })
            // console.log(res)
            dispatch(setLeaveList(res.data))
        } catch (err) {
            console.log("Not able to fetch issue from api", err?.message || err?.response?.data?.message)
            dispatch(setLeaveError(err?.response?.data?.message || err?.message || "Error in fetching issueList"))
        }
    }, [dispatch, limit, page, studentId])

    useEffect(() => {
        if (loading) {
            fetchLeave()
        }
    }, [fetchLeave, loading])

    if (loading && items.length === 0) {
        return <PageLoader />
    }
    else if (error) {
        return <h1>Error Page : {error}</h1>
    } else if (!loading && items?.length === 0) {
        return <h2>No items Found</h2>
    }
    return (
        <div className='bg-white rounded-xl shadow p-6'>

            <Table
                columns={leaveColumns(updateStatus, navigate,)}
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
