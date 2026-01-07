import { createSelector, createSlice } from "@reduxjs/toolkit";


const initialState = {
    byEntity: {},
}
const getKey = (entityType, entityId) => `${entityType}:${entityId}`;

const commentSlice = createSlice({
    initialState,
    name: "comments",
    reducers: {
        setComments: (state, action) => {
            const { entityType, entityId, comments } = action.payload;
            state.byEntity[getKey(entityType, entityId)] = {
                loading: false,
                error: null,
                items: comments,
            }
        },
        addComment: (state, action) => {
            const { entityType, entityId, comment } = action.payload;
            const key = getKey(entityType, entityId);
            if (!state.byEntity[key]) {
                state.byEntity[key] = {
                    items: [],
                    loading: false,
                    error: null,
                };
            }
            state.byEntity[key]?.items.unshift(comment)
        },
        setCommentsLoading: (state, action) => {
            const { entityType, entityId } = action.payload;
            const key = getKey(entityType, entityId)

            state.byEntity[key] = {
                ...(state.byEntity[key] || { items: [] }),
                loading: true,
                error: null,
            }
        },
        setCommentsError: (state, action) => {
            const { entityType, entityId, error } = action.payload;
            const key = getKey(entityType, entityId)
            state.byEntity[key] = {
                loading: false,
                error: error,
                ...(state.byEntity[key] || { items: [] }),
            }

        },
        clearComment: (state, action) => {
            const { entityType, entityId } = action.payload;
            delete state.byEntity[getKey(entityType, entityId)]
        }
    }
})

export const { clearComment, setCommentsError, setCommentsLoading, addComment, setComments } = commentSlice.actions;


const selectCommentEntities = (state) => state?.comments?.byEntity ?? {};
export const selectAllCommentState = createSelector([selectCommentEntities, (_state, key) => key],
    (byEntity, key) => {
        const entity = byEntity[key]
        return {
            items: entity?.items || [],
            loading: entity?.loading || false,
            error: entity?.error || null,
        }
    }
)
export const makeCommentKey = (entityType, entityId) =>
    `${entityType}:${entityId}`;

export default commentSlice.reducer;