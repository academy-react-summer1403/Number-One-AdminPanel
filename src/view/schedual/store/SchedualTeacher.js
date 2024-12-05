import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  PageNumber: 1,
  RowsOfPage: 9,
  startDate: "1900/01/10",
  endDate: "3000/01/10",
  FilteredData: [],
  Data: [],
  DetailGroup: [],
};

const SchedualTeacherSlice = createSlice({
  name: "schedual-teacher-sclie",
  initialState,
  reducers: {
    handleDataTeacher: (state, action) => {
      state.Data = action.payload;
      state.FilteredData = action.payload;
    },
    handlePageNumberTeacher: (state, action) => {
      state.PageNumber = action.payload;
    },
    handleRowsOfPageTeacher: (state, action) => {
      state.RowsOfPage = action.payload;
    },
    handleFilterDateTeacher: (state, action) => {
      state.startDate = action.payload.startDate;
      state.endDate = action.payload.endDate;
      toast.success("فیلتر اعمال شد");
    },
    handleDetailGroupTeacher: (state, action) => {
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
  handleDataTeacher,
  handlePageNumberTeacher,
  handleRowsOfPageTeacher,
  handleFilterDateTeacher,
  handleDetailGroupTeacher,
} = SchedualTeacherSlice.actions;
export default SchedualTeacherSlice.reducer;
