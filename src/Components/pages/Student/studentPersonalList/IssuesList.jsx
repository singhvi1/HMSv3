import { useDispatch, useSelector } from 'react-redux';
import { selectIssuesAllState, selectIssuesItems, selectIssuesPageData, setIssues, setIssuesError, setIssuesPage } from '../../../../utils/store/issuesSlice';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '../../../common/table/Table';
import { issueColumns } from '../../../../../MockData';
import { issueService } from '../../../../services/apiService';
import Pagination from '../../../common/table/Pagination';
import useIssueDelete from '../../../../customHooks/useIssueDelete';

import PageLoader from "../../../common/PageLoader"
import { selectLoggedinUserAllState } from '../../../../utils/store/logedinUser';



const IssuesList = ({ studentId }) => {
    console.log(studentId, "this is userId passed To issuelist");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { role } = useSelector(selectLoggedinUserAllState)
    const { items, loading, error } = useSelector(selectIssuesAllState);
    const { page, pages, limit } = useSelector(selectIssuesPageData);
    const deleteIssueFxn = useIssueDelete()

    const fetchIssueById = useCallback(async () => {
        try {
            const res = await issueService.getAllIssueOfStudent({
                studentId,
                page,
                limit
            })
            dispatch(setIssues(res.data))
        } catch (err) {
            console.log("Not able to fetch issue from api", err?.message || err?.response?.data?.message)
            dispatch(setIssuesError(err?.response?.data?.message || err?.message || "Error in fetching issueList"))
        }
    }, [dispatch, limit, page, studentId])

    useEffect(() => {
        if (loading) {
            fetchIssueById()
        }
    }, [fetchIssueById, loading])

    if (loading && items.length === 0) {
        return <PageLoader />
    }
    else if (error) {
        return <h1>Error Page : {error}</h1>
    } 
    return (
        <div>
            <Table
                columns={issueColumns(role, navigate, deleteIssueFxn)}
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
