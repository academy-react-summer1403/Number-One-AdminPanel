import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  PageNumber: 1,
  RowsOfPage: 6,
  Query: undefined,
  FilteredData: [],
  Data: [],
};

const AssistanceCourseSlice = createSlice({
  name: "assistance-course",
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
          item.courseName.toLowerCase().indexOf(action.payload.toLowerCase()) !=
          -1
      );
    },
  },
});

export const { handlePageNumber, handleRowsOfPage, handleQuery, handleData } =
AssistanceCourseSlice.actions;
export default AssistanceCourseSlice.reducer;
