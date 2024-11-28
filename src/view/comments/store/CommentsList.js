import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Query: undefined,
  SortingCol: undefined,
  SortType: "DESC",
  Accept: null,
  PageNumber: 1,
  RowsOfPage: 12,
};

const CommentList = createSlice({
  name: "Comments_Slice",
  initialState,
  reducers: {
    setQueryComment(state, action) {
      state.Query = action.payload;
    },
    setSortCal(state, action) {
      state.SortingCol = action.payload;
    },
    setSortType(state, action) {
      state.SortType = action.payload;
    },
    setAcceptComment(state, action) {
      state.Accept = action.payload;
    },
    setPageNumber(state, action) {
      state.PageNumber = action.payload;
    },
    setRowsOfPage(state, action) {
      state.RowsOfPage = action.payload;
    },
  },
});

export const {
  setQueryComment,
  setSortCal,
  setSortType,
  setAcceptComment,
  setPageNumber,
  setRowsOfPage,
} = CommentList.actions;

export default CommentList.reducer;
