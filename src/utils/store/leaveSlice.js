import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  loading: true,
  error: null,
  filters: {
    sid: "",
    room_number: "",
    block: "",
    status: "",
    from_date: "",
    to_date: "",
  },
  pagination: {
    page: 1,
    limit: 10,
    total: 1,
    pages: 0,
  },
};

const leaveSlice = createSlice({
  name: "leaves",
  initialState,
  reducers: {
    setLeaveList: (state, action) => {
      const { leaveRequests, pagination } = action.payload;
      state.items = leaveRequests;
      state.pagination = pagination;
      state.loading = false;
      state.error = null;

    },
    setLeave: (state, action) => {
      state.items.unshift(action.payload)
    },
    setLeaveError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    forceLeaveRefresh: (state) => {
      state.loading = true;
      state.error = null;
    },
    setLeaveFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.page = 1;
      state.loading = true;
      state.error = null;
    },
    setLeavePage(state, action) {
      state.pagination.page = action.payload;
      state.loading = true;
      state.error = null;
    },
    setLeavePageSize(state, action) {
      state.pagination.limit = action.payload;
      state.pagination.page = 1;
      state.loading = true;
      state.error = null;

    },
    updateLeaveStatus(state, action) {
      const updatedleaveRequest = action.payload.leaveRequest;
      const index = state.items.findIndex(l => l._id === updatedleaveRequest._id);
      if (index !== -1) state.items[index] = updatedleaveRequest;
    },
    resetLeaveSlice: () => initialState,
  },
});

export const {
  setLeaveList,
  setLeave,
  setLeaveError,
  forceLeaveRefresh,
  setLeaveFilters,
  setLeavePage,
  setLeavePageSize,
  updateLeaveStatus,
  resetLeaveSlice,
} = leaveSlice.actions;

const selectLeavesState = (state) => state.leaves;
export const selectAllLeaveState = createSelector(
  [selectLeavesState],
  (leaves) => ({
    items: leaves.items,
    loading: leaves.loading,
    error: leaves.error
  })
)


export const selectLeaveFilters = (state) => selectLeavesState(state).filters;
export const selectLeavePagination = (state) =>
  selectLeavesState(state).pagination;
export const selectLeaveItems = (state) => selectLeavesState(state).items;
export const selectAllLeaveRequestById = (id) => (state) => state.leaves.items.filter(item => item._id === id);


export const selectLeavePageData = createSelector(
  [selectLeaveItems, selectLeavePagination],
  (items, pagination) => ({
    items,
    page: pagination.page,
    limit: pagination.limit,
    total: pagination.total,
    pages: pagination.pages,

  })
);

export default leaveSlice.reducer;