import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "",
  categoryId: null,
  discribe: "",
  pictureList: [],
  exist: 0,
  price: 0,
  isActive: true,
  shopId: null,
  insertDate: "",
  discount: 0,
  miniDiscribe: "",
  googleDiscribe: "",
  googleTitle: "",
  special: "بله",
  previewImage: "",
};

const CreateProductsSlice = createSlice({
  name: "create-products",
  initialState,
  reducers: {
    handleImage: (state, action) => {
      state.previewImage = URL.createObjectURL(action.payload);
    },
    handleDescribe: (state, action) => {
      state.discribe = action.payload;
    },
    handleProductsInfo: (state, action) => {
      state.categoryId = action.payload.categoryId;
      state.discount = action.payload.discount;
      state.exist = action.payload.exist;
      state.googleDiscribe = action.payload.googleDiscribe;
      state.googleTitle = action.payload.googleTitle;
      state.isActive = action.payload.isActive;
      state.miniDiscribe = action.payload.miniDiscribe;
      state.price = action.payload.price;
      state.shopId = action.payload.shopId;
      state.title = action.payload.title;
      state.special = action.payload.special;
    },
  },
});

export const { handleDescribe, handleImage, handleProductsInfo } =
  CreateProductsSlice.actions;
export default CreateProductsSlice.reducer;
