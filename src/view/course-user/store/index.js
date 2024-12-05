import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  CourseId: null,
  PageNumber: 1,
  RowsOfPage: 9,
  SortingCol: null,
  SortType: null,
  Query: undefined,
};

const CourseUserSlice = createSlice({
  name: "course-user",
  initialState,
  reducers: {
    handleCourseId: (state, action) => {
      state.CourseId = action.payload;
    },
    handlePageNumber: (state, action) => {
      state.PageNumber = action.payload;
    },
    handleRowsOfPage: (state, action) => {
      state.RowsOfPage = action.payload;
    },
    handleQueryCU: (state, action) => {
      state.Query = action.payload;
    },
    handleSortingCol: (state, action) => {
      state.SortingCol = action.payload;
    },
    handleSortType: (state, action) => {
      state.SortType = action.payload;
    },
  },
});

export const {
  handleCourseId,
  handlePageNumber,
  handleQueryCU,
  handleRowsOfPage,
  handleSortType,
  handleSortingCol,
} = CourseUserSlice.actions;
export default CourseUserSlice.reducer;
