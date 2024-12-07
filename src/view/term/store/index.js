import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  PageNumber: 1,
  RowsOfPage: 10,
  Query: undefined,
  FilteredData: [],
  Data: [],
};

const TermList = createSlice({
  name: "term-list",
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
          item.termName.toLowerCase().indexOf(action.payload.toLowerCase()) !=
          -1
      );
    },
  },
});

export const { handleData, handlePageNumber, handleQuery, handleRowsOfPage } =
  TermList.actions;
export default TermList.reducer;
