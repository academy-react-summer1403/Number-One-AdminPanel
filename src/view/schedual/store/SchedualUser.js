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

const SchedualUserSlice = createSlice({
  name: "schedual-teacher-sclie",
  initialState,
  reducers: {
    handleDataUser: (state, action) => {
      state.Data = action.payload;
      state.FilteredData = action.payload;
    },
    handlePageNumberUser: (state, action) => {
      state.PageNumber = action.payload;
    },
    handleRowsOfPageUser: (state, action) => {
      state.RowsOfPage = action.payload;
    },
    handleFilterDateUser: (state, action) => {
      state.startDate = action.payload.startDate;
      state.endDate = action.payload.endDate;
      toast.success("فیلتر اعمال شد");
    },
    handleDetailGroupUser: (state, action) => {
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
  handleDataUser,
  handlePageNumberUser,
  handleRowsOfPageUser,
  handleFilterDateUser,
  handleDetailGroupUser,
} = SchedualUserSlice.actions;
export default SchedualUserSlice.reducer;
