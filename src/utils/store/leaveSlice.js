import { createSelector, createSlice } from "@reduxjs/toolkit";
import { leaves as mockLeaves } from "../../../data";
import { Pagination } from "antd";

const initialState = {
  items: mockLeaves,
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
      state.items = leaveRequests
      state.pagination.page = pagination.page
      state.pagination.limit = pagination.limit
      state.pagination.pages = pagination.pages
      state.pagination.total = pagination.total
    },
    setLeaveFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.page = 1;
    },
    setLeavePage(state, action) {
      state.pagination.page = action.payload;
    },
    setLeavePageSize(state, action) {
      state.pagination.limit = action.payload;
      state.pagination.page = 1;
    },
    updateLeaveStatus(state, action) {
      const updatedleaveRequest = action.payload.leaveRequest;
      const index = state.items.findIndex(l => l._id === updatedleaveRequest._id);
      if (index !== -1) state.items[index] = updatedleaveRequest;
    },

  },
});

export const {
  setLeaveList,
  setLeaveFilters,
  setLeavePage,
  setLeavePageSize,
  updateLeaveStatus,
} = leaveSlice.actions;

const selectLeavesState = (state) => state.leaves;
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