import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  AllList: [],
  FilteredList: [],
  Query: undefined,
  PageNumber: 1,
  RowsOfPage: 15,
  SortingCol: null,
  isActive: true,
};

const ShopList = createSlice({
  name: "shop-list",
  initialState,
  reducers: {
    handleAllList: (state, action) => {
      state.AllList = action.payload;
      state.FilteredList = action.payload?.filter(
        (item) => item.isActive === state.isActive
      );
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
          item.name.indexOf(action.payload) != -1 &&
          item.isActive === state.isActive
      );
    },
    handleIsActive: (state, action) => {
      state.isActive = action.payload;
      state.FilteredList = state.AllList?.filter(
        (item) => item.isActive === action.payload
      );
    },
    handleSortingCol: (state, action) => {
      state.SortingCol = action.payload;
      state.FilteredList = state.FilteredList?.sort((a, b) => {
        console.log(b.endTime - b.startTime) 
        if (action?.payload == "rate") return b.rate - a.rate;
        else return (b.endTime - b.startTime) - (a.endTime - a.startTime);
      });
    },
  },
});

export const {
  handleAllList,
  handlePageNumber,
  handleRowsOfPage,
  handleQuery,
  handleIsActive,
  handleSortingCol,
} = ShopList.actions;

export default ShopList.reducer;
