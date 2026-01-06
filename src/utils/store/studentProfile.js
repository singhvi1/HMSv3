import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    student: null,
    loading: true,
};
const studentProfile = createSlice({
    initialState: initialState,
    name: "studentProfile",
    reducers: {
        setStudent: (state, action) => {
            state.student = action.payload;
            state.loading = false;
        },
        reSetStudent: () => {
            return initialState;
        }
    }
})
export const { setStudent, reSetStudent } = studentProfile.actions;

export default studentProfile.reducer;