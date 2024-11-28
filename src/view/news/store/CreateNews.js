import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Title: "",
  GoogleTitle: "",
  GoogleDescribe: "",
  MiniDescribe: "",
  Describe: [],
  Keyword: "",
  NewsCatregoryId: null,
  Image: null,
  PreviewImage: "",
};

const CreateNewsSlice = createSlice({
  name: "create-news-slice",
  initialState,
  reducers: {
    handleImage: (state, action) => {
      state.PreviewImage = URL.createObjectURL(action.payload);
      state.Image = action.payload;
    },
    handleDescribe: (state, action) => {
      state.Describe = action.payload;
    },
    handleSetInfo: (state, action) => {
      state.Title = action.payload.Title;
      state.GoogleDescribe = action.payload.GoogleDescribe;
      state.GoogleTitle = action.payload.GoogleTitle;
      state.Keyword = action.payload.Keyword;
      state.MiniDescribe = action.payload.MiniDescribe;
      state.NewsCatregoryId = action.payload.NewsCatregoryId;
    },
  },
});

export const {
  handleImage,
  handlePreviewImage,
  handleDescribe,
  handleSetInfo,
} = CreateNewsSlice.actions;

export default CreateNewsSlice.reducer;
