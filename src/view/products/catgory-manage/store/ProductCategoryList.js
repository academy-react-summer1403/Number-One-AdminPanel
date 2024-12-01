import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  AllList: [],
  Query: undefined,
  PageNumber: 1,
  RowsOfPage: 15,
};

const ProductCategoryList = createSlice({
  name: "ProductCategory-list",
  initialState,
  reducers: {
    handleAllList: (state, action) => {
      state.AllList = action.payload;
    },
    handlePageNumber: (state, action) => {
      state.PageNumber = action.payload;
    },
    handleRowsOfPage: (state, action) => {
      state.RowsOfPage = action.payload;
    },
    handleQuery: (state, action) => {
      state.Query = action.payload;
    },
  },
});

export const {
  handleAllList,
  handlePageNumber,
  handleRowsOfPage,
  handleQuery,
} = ProductCategoryList.actions;

export default ProductCategoryList.reducer;
