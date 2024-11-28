// ** Reducers Imports
import layout from "./layout";
import navbar from "./navbar";
import CoursesList from "../view/courses/store/CourseList"
// User
import { FilterSlice, UserInfoSlice } from "../view/user/store";
// News
import { CreateNewsSlice, NewsDetail, NewsList } from "../view/news/store";
// Products
import { CreateProductsSlice, ProductsList } from "../view/products/store";

import { ShopList , CreateShopsSlice } from "../view/shops/store";
import { CommentList } from "../view/comments/store";

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
  ShopList,
  CreateShopsSlice,
  CommentList,
};

export default rootReducer;
