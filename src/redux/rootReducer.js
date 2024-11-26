// ** Reducers Imports
import layout from "./layout";
import navbar from "./navbar";
import UserInfoSlice from "../view/user/store/UserInfoSlice";
import FilterSlice from "../view/user/store/FilterSlice";
import NewsList from "../view/news/store/NewsList";
import NewsDetail from "../view/news/store/NewsDetail";
import CreateNewsSlice from "../view/news/store/CreateNews";
import CoursesList from "../view/courses/store/CourseList"
// User
import { FilterSlice, UserInfoSlice } from "../view/user/store";
// News
import { CreateNewsSlice, NewsDetail, NewsList } from "../view/news/store";
// Products
import { CreateProductsSlice, ProductsList } from "../view/products/store";

const rootReducer = {
  navbar,
  layout,
  UserInfoSlice,
  FilterSlice,
  NewsList,
  NewsDetail,
  CreateNewsSlice,
  CoursesList,
  CreateProductsSlice,
  ProductsList,
};

export default rootReducer;
