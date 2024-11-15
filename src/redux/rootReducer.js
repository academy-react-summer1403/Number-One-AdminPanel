// ** Reducers Imports
import layout from "./layout";
import navbar from "./navbar";
import UserInfoSlice from "../view/user/store/UserInfoSlice";
import FilterSlice from "../view/user/store/FilterSlice";
import NewsList from "../view/news/store/NewsList";
import NewsDetail from "../view/news/store/NewsDetail";
import CreateNewsSlice from "../view/news/store/CreateNews";

const rootReducer = {
  navbar,
  layout,
  UserInfoSlice,
  FilterSlice,
  NewsList,
  NewsDetail,
  CreateNewsSlice,
};

export default rootReducer;
