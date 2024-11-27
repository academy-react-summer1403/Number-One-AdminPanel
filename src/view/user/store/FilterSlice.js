import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  PageNumber: 1,
  RowsOfPage: 6,
  SortingCol: null,
  SortType: null,
  Query: undefined,
  IsActiveUser: null,
  IsDeletedUser: null,
  roleId: null,
};

const FilterSlice = createSlice({
  name: "user-manage",
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
    handleIsActiveUser: (state, action) => {
      state.IsActiveUser = action.payload;
    },
    handleIsDeletedUser: (state, action) => {
      state.IsDeletedUser = action.payload;
    },
    handleRoleId: (state, action) => {
      state.roleId = action.payload;
    },
  },
});

export const {
  handlePageNumber,
  handleRowsOfPage,
  handleSortingCol,
  handleSortType,
  handleQuery,
  handleIsActiveUser,
  handleIsDeletedUser,
  handleRoleId,
} = FilterSlice.actions;
export default FilterSlice.reducer;
