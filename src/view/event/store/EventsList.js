import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Query: undefined,
  PageNumber: 1,
  RowsOfPage: 15,
  SortingCol: null,
  isActive: true,
};

const EventsList = createSlice({
  name: "events-list",
  initialState,
  reducers: {
    handlePageNumber: (state, action) => {
      state.PageNumber = action.payload;
    },
    handleRowsOfPage: (state, action) => {
      state.RowsOfPage = action.payload;
    },
    handleQuery: (state, action) => {
      state.Query = action.payload;
    },
    handleIsActive: (state, action) => {
      state.isActive = action.payload;
    },
    handleSortingCol: (state, action) => {
      state.SortingCol = action.payload;
    },
  },
});

export const {
  handlePageNumber,
  handleRowsOfPage,
  handleQuery,
  handleIsActive,
  handleSortingCol,
} = EventsList.actions;
export default EventsList.reducer;
