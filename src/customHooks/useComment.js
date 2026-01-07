import { useDispatch, useSelector } from "react-redux"
import { addComment, makeCommentKey, selectAllCommentState, setComments, setCommentsError, setCommentsLoading } from "../utils/store/commentSlice"
import { issueCommentService } from "../services/apiService"
import { useCallback, useRef } from "react"

export const useComments = (entityType, entityId) => {
    const dispatch = useDispatch()
    const { items, loading, error } = useSelector((state) => selectAllCommentState(state, makeCommentKey(entityType, entityId)))
    const fetchRef = useRef(false);

    //fetch
    const fetchComments = useCallback(async () => {
        try {
            if (!entityId) return;
            if (fetchRef.current) return;
            fetchRef.current = true;
            dispatch(setCommentsLoading({ entityType, entityId }))
            const res = await issueCommentService.getIssueAllCommetents(entityId);
            dispatch(setComments({
                entityType, entityId,
                comments: res.data.comments
            }))
        } catch (err) {
            fetchRef.current = false;
            console.log(err?.message || "not Able to fetch comments")
            dispatch(setCommentsError({
                entityType, entityId,
                error: err?.message
            }))
        }
    }, [entityId, dispatch, entityType])
    //create
    const createComment = useCallback(async (data) => {
        try {
            const res = await issueCommentService.createComment(data);
            dispatch(addComment({
                entityType, entityId,
                comment: res.data.comment,
            }))
        } catch (err) {
            console.log("Not able to create Comment", err?.message);
            dispatch(setCommentsError({
                entityType, entityId,
                error: err.message
            }))
        }
    }, [dispatch, entityId, entityType])
    //retrun
    return { fetchComments, createComment, items, loading, error }

}

