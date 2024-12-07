import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  PageNumber: 1,
  RowsOfPage: 10,
  startDate: "1900/01/10",
  endDate: "3000/01/10",
  FilteredData: [],
  Data: [],
  DetailGroup: [],
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
    handleFilterDate: (state, action) => {
      state.startDate = action.payload.startDate;
      state.endDate = action.payload.endDate;
      toast.success("فیلتر اعمال شد");
    },
    handleDetailGroup: (state, action) => {
      let exist = state.DetailGroup.find(
        (ev) => ev.groupId === action.payload.groupId
      );
      if (!exist) {
        state.DetailGroup.push(action.payload);
      }
    },
  },
});

export const {
  handlePageNumber,
  handleRowsOfPage,
  handleData,
  handleFilterDate,
  handleDetailGroup,
} = SchedualSlice.actions;
export default SchedualSlice.reducer;
