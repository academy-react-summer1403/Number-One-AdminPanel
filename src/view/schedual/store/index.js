import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  PageNumber: 1,
  RowsOfPage: 9,
  Query: undefined,
  startDate: "1900/01/10",
  endDate: "3000/01/10",
  FilteredData: [],
  Data: [],
};

const SchedualSlice = createSlice({
  name: "schedual-sclie",
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
          item.buildingName
            .toLowerCase()
            .indexOf(action.payload.toLowerCase()) != -1
      );
    },
    handleFilterDate: (state, action) => {
      state.startDate = action.payload.startDate;
      state.endDate = action.payload.endDate;
      toast.success("فیلتر اعمال شد")
    },
  },
});

export const {
  handlePageNumber,
  handleRowsOfPage,
  handleQuery,
  handleData,
  handleFilterDate,
} = SchedualSlice.actions;
export default SchedualSlice.reducer;
