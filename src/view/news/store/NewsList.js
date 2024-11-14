import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  PageNumber: 1,
  RowsOfPage: 12,
  SortingCol: null,
  SortType: null,
  Query: undefined,
  IsActive: true,
};

const NewsList = createSlice({
  name: "news-list",
  initialState,
  reducers: {
    handlePageNumber: (state, action) => {
      state.PageNumber = action.payload;
    },
    handleRowsOfPage: (state, action) => {
      state.RowsOfPage = action.payload;
    },
    handleSortingCol: (state, action) => {
      state.SortingCol = action.payload;
    },
    handleSortType: (state, action) => {
      state.SortType = action.payload;
    },
    handleQuery: (state, action) => {
      state.Query = action.payload;
    },
    handleIsActive: (state, action) => {
      state.IsActive = action.payload;
    },
  },
});

export const {
  handlePageNumber,
  handleRowsOfPage,
  handleSortingCol,
  handleSortType,
  handleQuery,
  handleIsActive,
} = NewsList.actions;
export default NewsList.reducer;
