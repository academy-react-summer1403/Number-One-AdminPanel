import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  AllList: [],
  Query: undefined,
  PageNumber: 1,
  RowsOfPage: 15,
};

const ShopCategoryList = createSlice({
  name: "ShopCategory-list",
  initialState,
  reducers: {
    handleAllList: (state, action) => {
      state.AllList = action.payload;
    //   state.FilteredList = action.payload;
    },
    handlePageNumber: (state, action) => {
      state.PageNumber = action.payload;
    },
    handleRowsOfPage: (state, action) => {
      state.RowsOfPage = action.payload;
    },
    handleQuery: (state, action) => {
      state.Query = action.payload;
    //   state.FilteredList = state.AllList?.filter(
    //     (item) =>
    //       item.levelName.indexOf(action.payload) != -1 
    //   );
    },
  },
});

export const {
  handleAllList,
  handlePageNumber,
  handleRowsOfPage,
  handleQuery,
} = ShopCategoryList.actions;

export default ShopCategoryList.reducer;
