import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "",
  miniDescribe: "",
  describe: "",
  currentImageAddressTumb: "",
  isActive: true,
  price: 0,
  addUserFullName: "",
  startEventTime: "",
  address: "",
  students: 0,
  chairs: 0,
  googleDescribe: "",
  googleTitle: "",
  previewImage: "",
};

const CreateEvent = createSlice({
  name: "create-event",
  initialState,
  reducers: {
    handleImage: (state, action) => {
      state.previewImage = URL.createObjectURL(action.payload);
    },
    handleDescribe: (state, action) => {
      state.describe = action.payload;
    },
    handleEventInfo: (state, action) => {
      state.googleDescribe = action.payload.googleDescribe;
      state.googleTitle = action.payload.googleTitle;
      state.isActive = action.payload.isActive;
      state.miniDescribe = action.payload.miniDescribe;
      state.price = action.payload.price;
      state.title = action.payload.title;
      state.chairs = action.payload.chairs;
      state.students = action.payload.students;
      state.address = action.payload.address;
      state.startEventTime = action.payload.startEventTime;
      state.addUserFullName = action.payload.addUserFullName;
    },
  },
});

export const { handleDescribe, handleImage, handleEventInfo } =
  CreateEvent.actions;
export default CreateEvent.reducer;
