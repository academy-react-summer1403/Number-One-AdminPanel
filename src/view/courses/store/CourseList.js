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
    handleCoursePageNumber: (state, action) => {
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
      if (action.payload == "") {
        state.Query = undefined;
      } else {
        state.Query = action.payload;
      }
    },
  },
});

export const {
  handleCoursePageNumber,
  handleRowsOfPage,
  handleSortingCol,
  handleSortType,
  handleQueryCourse,
} = CoursesList.actions;
export default CoursesList.reducer;
