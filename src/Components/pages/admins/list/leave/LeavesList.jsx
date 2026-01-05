import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectLeaveFilters, selectLeavePageData, setLeaveFilters, setLeaveList, setLeavePage, setLeavePageSize } from '../../../../../utils/store/leaveSlice';
import { leaveColumns } from '../../../../../../MockData';
import BackButton from '../../../../common/ui/Backbutton';
import SearchBar from '../../../../common/table/SearchBar';
import Table from '../../../../common/table/Table';
import Pagination from '../../../../common/table/Pagination';
import { useCallback, useEffect, useState } from 'react';
import { leaveService } from '../../../../../services/apiService';
import { useDebounce } from '../../../../../customHooks/useDebounce';
import { useLeaveStatus } from '../../../../../customHooks/useLeaveStatus';

const LeavesList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const filters = useSelector(selectLeaveFilters);
    const { page, pages, limit, items } = useSelector(selectLeavePageData)
    const debouncedSid = useDebounce(filters.sid, 900)
    const debouncedRoomNumber = useDebounce(filters.room_number, 600)
    const debouncedFromDate = useDebounce(filters.to_date, 600)
    const debouncedToDate = useDebounce(filters.from_date, 600)
    const [loading, setLoading] = useState(false)
    const { updateStatus } = useLeaveStatus()


    const fetchLeave = useCallback(async () => {
        try {
            setLoading(true)
            const res = await leaveService.getAllLeaves({
                page,
                limit,
                sid: debouncedSid,
                room_number: debouncedRoomNumber,
                from_date: debouncedFromDate,
                to_date: debouncedToDate,
                status: filters.status,
                block: filters.block,

            })
            console.log(res, "Api called")
            dispatch(setLeaveList(res.data))
        } catch (err) {
            console.log(err, "Not able to fetch leave Request")
        } finally {
            setLoading(false)
        }
    }, [page, limit, debouncedSid, debouncedRoomNumber, debouncedFromDate, debouncedToDate, filters.status, filters.block, dispatch])

    useEffect(() => {
        fetchLeave()
    }, [fetchLeave])


    return (
        <div className="bg-white rounded-xl shadow p-6">

            <BackButton />
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                    Leaves List
                </h2>

            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">

                <SearchBar search={filters.sid} onChange={(v) => dispatch(setLeaveFilters({ sid: v }))} placeholder={"Sid"} />

                <SearchBar search={filters.room_number} onChange={(v) => dispatch(setLeaveFilters({ room_number: v }))} placeholder={"RoomNumber"} />

                <select
                    className="input"
                    value={filters.block}
                    onChange={(e) => dispatch(setLeaveFilters({
                        block: e.target.value
                    }))}
                >
                    <option value="">All Block</option>
                    <option value="a">Block A</option>
                    <option value="b">Block B</option>
                    <option value="c">Block C</option>
                </select>
                {/* <input
                    type="date"
                    className="input"
                    value={filters.from_date}
                    onChange={(e) =>
                        dispatch(setLeaveFilters({ from_date: e.target.value }))
                    }
                /> */}

                {/* <input
                    type="date"
                    className="input"
                    value={filters.to_date}
                    onChange={(e) =>
                        dispatch(setLeaveFilters({ to_date: e.target.value }))
                    }
                /> */}




                <div className="flex gap-3">
                    <select
                        className="input"
                        value={filters.status}
                        onChange={(e) => dispatch(setLeaveFilters({ status: e.target.value }))}
                    >
                        <option value="">All Status</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                        <option value="pending">Pending</option>
                    </select>

                    <select
                        className="input"
                        value={limit}
                        onChange={(e) => dispatch(setLeavePageSize(Number(e.target.value)))}
                    >
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                    </select>
                </div>
            </div>


            <Table
                columns={leaveColumns(updateStatus, navigate)}
                data={items}
            />

            <Pagination
                currPage={page}
                totalPages={pages}
                onPageChange={(p) => dispatch(setLeavePage(p))}
            />
        </div>
    )
}

export default LeavesList
