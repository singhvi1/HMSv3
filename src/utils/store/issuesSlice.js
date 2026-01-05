import { createSelector, createSlice } from "@reduxjs/toolkit";
import { issueList as mockIssues } from "../../../data";

const initialState = {
  items: [],
  filters: {
    search: "",
    status: "",
    block: "",
    sid: "",
    category: "",
    room_number: "",
    student_search: "",
  },
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    pages: 1,
  }
};

const issuesSlice = createSlice({
  name: "issues",
  initialState,
  reducers: {
    setIssues: (state, action) => {
      const { issues, pagination } = action.payload;
      state.items = issues;
      state.pagination.total = pagination.total;
      state.pagination.page = pagination.page;
      state.pagination.limit = pagination.limit;
      state.pagination.pages = pagination.pages;
    },
    setIssue: (state, action) => {
      const issue = action.payload;
      const index = state.items.findIndex(i => i._id === issue._id);
      if (index !== -1) {
        state.items[index] = issue
      } else {
        state.items.unshift(issue);
      }
    },
    updateIssueStatus: (state, action) => {
      const { id, status } = action.payload;
      const index = state.items.findIndex(i => i._id === id);
      if (index !== -1) {
        state.items[index].status = status;
      } else {
        return
      }
    },
    removeOneIssue: (state, action) => {
      const id = action.payload
      state.items = state?.items.filter(item => item?._id !== id)
      state.pagination.total = state.pagination.total - 1;
    },
    setIssuesFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.page = 1;
    },
    setIssuesPage: (state, action) => {
      state.pagination.page = action.payload;
    },
    setIssueslimit: (state, action) => {
      state.pagination.limit = action.payload;
      state.pagination.page = 1;
    },
    resetIssuesFilters: (state) => {
      state.filters = initialState.filters;
      state.pagination = initialState.pagination;
    }
  }
});

export const {
  setIssues,
  setIssue,
  updateIssueStatus,
  removeOneIssue,
  setIssuesFilters,
  setIssuesPage,
  setIssueslimit,
  resetIssuesFilters
} = issuesSlice.actions;

const selectIssuesState = (state) => state.issues;

export const selectIssuesItems = (state) => selectIssuesState(state).items;
export const selectIssueById = (id) => (state) => state?.issues?.items.find(item => item._id === id);
export const selectIssuesFilters = (state) => selectIssuesState(state).filters;
export const selectIssuesPagination = (state) => selectIssuesState(state).pagination;
export const selectIssuesTotalCount = (state) => selectIssuesState(state).pagination.total;

/*export const selectIssuesFiltered = createSelector(
  [selectIssuesItems, selectIssuesFilters],
  (items, filters) => {
    const search = filters.search.trim().toLowerCase();
    return items.filter((issue) => {
      const title = (issue?.title || "").toLowerCase();
      const description = (issue?.description || "").toLowerCase();
      const status = (issue?.status || "").toLowerCase();
      const block = (issue?.block || "").toLowerCase();
      const category = (issue?.category || "").toLowerCase();
      const sid = (issue?.sid || "").toLowerCase();
      const room_number = (issue?.room_number || "");

      const matchesSearch =
        !search ||
        title.includes(search) ||
        description.includes(search);

      const matchesStatus = !filters.status || status === filters.status.toLowerCase();
      const matchesBlock = !filters.block || block === filters.block.toLowerCase();
      const matchescategory = !filters.category || category === filters.category.toLowerCase();
      const matchesSid = !filters.sid || sid === filters.sid.toLowerCase();
      const matchesRoom_number = !filters.room_number || room_number === filters.room_number;

      return matchesSearch && matchesStatus && matchesBlock && matchescategory && matchesSid && matchesRoom_number;
    });
  }
);*/

export const selectIssuesPageData = createSelector(
  [selectIssuesPagination],
  (pagination) => ({
    page: pagination.page,
    limit: pagination.limit,
    total: pagination.total,
    pages: pagination.pages,
  })
);


export const selectIssuesPendingCount = createSelector(
  [selectIssuesItems],
  (items) => items.filter((i) => i.status === "pending").length
);

export default issuesSlice.reducer;
