import { createSelector, createSlice } from "@reduxjs/toolkit";

const loggedinUser = createSlice({
    name: "loggedinUser",
    initialState: null,
    reducers: {
        setLoggedinUser: (_state, action) => {
            return action.payload;
        },
        removeLoggedinUser: () => {
            return null;
        }

    }
})
export const { setLoggedinUser, removeLoggedinUser } = loggedinUser.actions;


const selectLoggedinUserState = (state) => state.loggedinUser;
export const selectLoggedinUserAllState = createSelector(
    [selectLoggedinUserState],
    (loggedinUser) => ({
        full_name: loggedinUser.full_name,
        email: loggedinUser.email,
        phone: loggedinUser.phone,
        role: loggedinUser.role,
        status: loggedinUser.status,
    })
)
export default loggedinUser.reducer;