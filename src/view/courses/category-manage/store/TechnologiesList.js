import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  AllList: [],
  FilteredList: [],
  Query: undefined,
  PageNumber: 1,
  RowsOfPage: 15,
};

const TechnologiesList = createSlice({
  name: "Technologies-list",
  initialState,
  reducers: {
    handleAllList: (state, action) => {
      state.AllList = action.payload;
      state.FilteredList = action.payload;
    },
    handlePageNumber: (state, action) => {
      state.PageNumber = action.payload;
    },
    handleRowsOfPage: (state, action) => {
      state.RowsOfPage = action.payload;
    },
    handleQuery: (state, action) => {
      state.Query = action.payload;
      state.FilteredList = state.AllList?.filter(
        (item) =>
          item.techName.indexOf(action.payload) != -1 
      );
    },
  },
});

export const {
  handleAllList,
  handlePageNumber,
  handleRowsOfPage,
  handleQuery,
} = TechnologiesList.actions;

export default TechnologiesList.reducer;
