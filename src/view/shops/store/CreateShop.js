import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  categoryId: "",
  rate: "",
  address: "",
  startTime: "",
  endTime: "",
  aboutUs: "",
  isActive: true,
  img: "",
  products: [],
  permissionIds: [],
};

const CreateShopsSlice = createSlice({
  name: "create-shops",
  initialState,
  reducers: {
    handleImage: (state, action) => {
      state.img = URL.createObjectURL(action.payload);
    },
    handleDescribe: (state, action) => {
      state.aboutUs = action.payload;
    },
    handleShopsInfo: (state, action) => {
      state.name = action.payload.name;
      state.categoryId = action.payload.categoryId;
      state.rate = action.payload.rate;
      state.address = action.payload.address;
      state.startTime = action.payload.startTime;
      state.endTime = action.payload.endTime;
      state.isActive = action.payload.isActive;
      state.permissionIds = action.payload.permissionIds
    },
  },
});

export const { handleDescribe, handleImage, handleShopsInfo } =
  CreateShopsSlice.actions;
export default CreateShopsSlice.reducer;
