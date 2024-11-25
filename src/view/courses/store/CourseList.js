import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  PageNumber: 1,
  RowsOfPage: 15,
  SortingCol: null,
  SortType: null,
  Query: undefined,
};

const CoursesList = createSlice({
  name: "courses-list",
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
    handleQueryCourse: (state, action) => {
      state.Query = action.payload;
    },
  },
});

export const {
  handlePageNumber,
  handleRowsOfPage,
  handleSortingCol,
  handleSortType,
  handleQueryCourse,
} = CoursesList.actions;
export default CoursesList.reducer;