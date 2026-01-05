import { useDispatch, useSelector } from 'react-redux';
import { selectIssuesItems, selectIssuesPageData, setIssues, setIssuesPage } from '../../../../utils/store/issuesSlice';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '../../../common/table/Table';
import { issueColumns } from '../../../../../MockData';
import { issueService } from '../../../../services/apiService';
import Pagination from '../../../common/table/Pagination';
import useIssueDelete from '../../../../customHooks/useIssueDelete';
// import { issueService } from '../../../../services/apiService';

const IssuesList = ({ studentId }) => {
    console.log(studentId, "this is userId passed To issuelist");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const items = useSelector(selectIssuesItems);
    const { page, pages, limit } = useSelector(selectIssuesPageData);
    console.log("this is data pased from pagination", page, limit, pages)
    const deleteIssueFxn = useIssueDelete()

    const fetchIssueById = useCallback(async () => {
        try {
            setLoading(true)
            const res = await issueService.getAllIssueOfStudent({
                studentId,
                page,
                limit
            })

            dispatch(setIssues(res.data))
            console.log(res.data, "this is data coming from getAllIssuesOFStudent");

        } catch (err) {
            console.log("Not able to fetch issue from api", err)
        } finally {
            setLoading(false);
        }
    }, [dispatch, limit, page, studentId])

    useEffect(() => {
        fetchIssueById()
    }, [fetchIssueById])

    if (loading) {
        return <h2>this is loading please wait</h2>
    }
    return (
        <div>
            <Table
                columns={issueColumns(navigate, deleteIssueFxn)}
                data={items}
            />
            <Pagination
                currPage={page}
                onPageChange={(p) => dispatch(setIssuesPage(p))} totalPages={pages}
            />

        </div>
    )
}

export default IssuesList
