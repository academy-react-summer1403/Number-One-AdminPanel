import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  newsDetails: [],
  newsComments: [],
  newsReplyComment: [],
};

const NewsDetail = createSlice({
  name: "news-detail",
  initialState,
  reducers: {
    getNewsDetails: (state, action) => {
      state.newsDetails = action.payload;
    },
    getNewsComments: (state, action) => {
      state.newsComments = action.payload;
    },
    getNewsReplyComment: (state, action) => {
      state.newsReplyComment = action.payload;
    },
  },
});

export const { getNewsDetails, getNewsComments, getNewsReplyComment } =
  NewsDetail.actions;
export default NewsDetail.reducer;
