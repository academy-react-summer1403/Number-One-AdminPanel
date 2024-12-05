import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  PageNumber: 1,
  RowsOfPage: 9,
  Query: undefined,
  FilteredData: [],
  Data: [],
  UserDetails: [],
};

const JobHistorySlice = createSlice({
  name: "job-history-list",
  initialState,
  reducers: {
    handleData: (state, action) => {
      state.Data = action.payload;
      state.FilteredData = action.payload;
    },
    handlePageNumber: (state, action) => {
      state.PageNumber = action.payload;
    },
    handleRowsOfPage: (state, action) => {
      state.RowsOfPage = action.payload;
    },
    handleQuery: (state, action) => {
      state.Query = action.payload;
      state.FilteredData = state.Data.filter(
        (item) =>
          item.jobTitle.toLowerCase().indexOf(action.payload.toLowerCase()) != -1
      );
    },
    handleUserDetails: (state, action) => {
      let exist = state.UserDetails.find(
        (ev) => ev.id === action.payload.id
      );
      if (!exist) {
        state.UserDetails.push(action.payload);
      }
    },
  },
});

export const {
  handleData,
  handlePageNumber,
  handleQuery,
  handleRowsOfPage,
  handleUserDetails,
} = JobHistorySlice.actions;
export default JobHistorySlice.reducer;
