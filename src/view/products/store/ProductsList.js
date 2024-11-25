import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Query: undefined,
  PageNumber: 1,
  RowsOfPage: 15,
  SortingCol: null,
  isActive: true,
};

const ProductsList = createSlice({
  name: "products",
  initialState,
  reducers: {
    handlePageNumber: (state, action) => {
      state.PageNumber = action.payload;
    },
    handleRowsOfPage: (state, action) => {
      state.RowsOfPage = action.payload;
    },
    handleIsActive: (state, action) => {
      state.isActive = action.payload;
    },
    handleQuery: (state, action) => {
      state.Query = action.payload;
    },
    handleSortingCol: (state, action) => {
      console.log(action.payload);
      state.SortingCol = action.payload;
    },
  },
});

export const {
  handlePageNumber,
  handleRowsOfPage,
  handleIsActive,
  handleQuery,
  handleSortingCol,
} = ProductsList.actions;
export default ProductsList.reducer;
