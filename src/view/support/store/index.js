import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Query: undefined,
  Data: [],
  FilteredData: [],
  AdminUserList: [],
  TeacherUserList: [],
  SelectUser: {},
};

const SupportSlice = createSlice({
  name: "support",
  initialState,
  reducers: {
    handleData: (state, action) => {
      state.Data = action.payload;
    },
    handleQuery: (state, action) => {
      state.Query = action.payload.query;
      state.FilteredData = state?.[action.payload.section].filter(
        (item) =>
          item.lName.toLowerCase().indexOf(state.Query.toLowerCase()) != -1 ||
          item.fName.toLowerCase().indexOf(state.Query.toLowerCase()) != -1
      );
    },
    handleAdminUserList: (state, action) => {
      if (!state.AdminUserList.find((user) => user.id === action.payload.id)) {
        state.AdminUserList.push(action.payload);
      }
      state.FilteredData = state.AdminUserList;
    },
    handleTeacherUserList: (state, action) => {
      if (
        !state.TeacherUserList.find((user) => user.id === action.payload.id)
      ) {
        state.TeacherUserList.push(action.payload);
      }
      state.FilteredData = state.TeacherUserList;
    },
    handleSelectUser: (state, action) => {
      const userInfo = state.FilteredData.find(
        (user) => user.id === action.payload
      );
      const userChats = state.Data.find(
        (user) => user.userId === action.payload
      );

      if (action.payload != 0) {
        state.SelectUser = {
          fName: userInfo?.fName,
          lName: userInfo?.lName,
          currentPictureAddress: userInfo?.currentPictureAddress,
          chatRoom: userChats?.chatRoom,
          id: userChats?.id,
        };
      } else {
        state.SelectUser = {};
      }
    },
    handleMessage: (state, action) => {
      state.SelectUser.chatRoom.push(action.payload);
    },
  },
});

export const {
  handleData,
  handleQuery,
  handleAdminUserList,
  handleTeacherUserList,
  handleSelectUser,
  handleMessage,
} = SupportSlice.actions;
export default SupportSlice.reducer;
