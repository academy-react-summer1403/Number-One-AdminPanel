import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allUsers: [],
  totalCount: [],
  admins: [],
  teachers: [],
  students: [],
  details: [],
};

const UserInfoSlice = createSlice({
  name: "users-list",
  initialState,
  reducers: {
    handleAllUser: (state, action) => {
      state.allUsers = action.payload;
    },
    handleTotalCount: (state, action) => {
      state.totalCount = action.payload;
    },
    handleAdmins: (state, action) => {
      state.admins = action.payload;
    },
    handleTeachers: (state, action) => {
      state.teachers = action.payload;
    },
    handleStudents: (state, action) => {
      state.students = action.payload;
    },
    handleDetails: (state, action) => {
      state.details = action.payload;
    },
  },
});

export const {
  handleAllUser,
  handleTotalCount,
  handleAdmins,
  handleTeachers,
  handleStudents,
  handleDetails,
} = UserInfoSlice.actions;

export default UserInfoSlice.reducer;
