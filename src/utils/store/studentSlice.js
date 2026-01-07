import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  loading: true,
  error: null,
  filters: {
    search: "",
    branch: "",
    block: "",
    status: "",

  },
  pagination: {
    page: 1,
    limit: 10,
    pages: 1,
    total: 0,
  }
};

const studentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    setStudents: (state, action) => {
      state.items = action.payload.students;
      state.pagination = action.payload.pagination;
      state.loading = false;
      state.error = null;
    },
    setStudent: (state, action) => {
      const student = action.payload;
      const index = state.items.findIndex(r => r._id === student._id);
      if (index !== -1) {
        state.items[index] = student;
      } else {
        state.items.unshift(student);
        state.pagination.total += 1;
      }
    },
    setStudentStatus: (state, action) => {
      const { user_id, status } = action.payload;
      const student = state.items.find(s => s.user_id?._id === user_id)
      if (student) {
        student.user_id.status = status
      }
    },
    removeStudent: (state, action) => {
      const user_id = action.payload;
      state.items = state?.items?.filter(s => s.user_id?._id.toString() !== user_id);
      state.pagination.total -= 1;
    },
    setStudentError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    forceStudentRefresh: (state) => {
      state.loading = true;
      state.error = null;
    },
    setStudentsFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.page = 1;
      state.loading = true
      state.error = null;
    },
    setStudentsPage: (state, action) => {
      state.pagination.page = action.payload;
      state.loading = true;
      state.error = null;
    },
    setStudentsPageSize: (state, action) => {
      state.pagination.limit = action.payload;
      state.pagination.page = 1;
      state.loading = true
      state.error = null;
    },
    resetStudentsFilters: (state) => {
      state.filters = { ...initialState.filters }
      state.pagination = { ...initialState.pagination }
      state.loading = true;
      state.error = null;
    },
    resetStudents: () => initialState
  }
});

export const {
  setStudents,
  setStudent,
  setStudentsPageSize,
  setStudentStatus,
  removeStudent,
  setStudentError,
  forceStudentRefresh,
  setStudentsFilters,
  setStudentsPage,
  resetStudentsFilters,
  resetStudents,
} = studentsSlice.actions;





const selectStudentsState = (state) => state.students;
export const selectStudentByUserId = (id) => (state) => state.students.items.find((s) => s.user_id?._id === id);

export const selectStudentsItems = (state) => selectStudentsState(state).items
export const selectStudentsFilters = (state) => selectStudentsState(state).filters
export const selectStudentsPagination = (state) => selectStudentsState(state).pagination;
export const selectStudentsTotalCount = (state) => selectStudentsState(state).pagination.total

export const selectStudentAllState = createSelector(
  [selectStudentsState],
  (students) => ({
    items: students.items,
    loading: students.loading,
    error: students.error
  })
)
export const selectStudentPageData = createSelector([selectStudentsItems, selectStudentsPagination],
  (items, pagination) => ({
    items,
    page: pagination.page,
    limit: pagination.limit,
    pages: pagination.pages,
  }))

export default studentsSlice.reducer;
