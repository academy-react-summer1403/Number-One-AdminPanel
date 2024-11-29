// ** Reducers Imports
import layout from "./layout";
import navbar from "./navbar";
import CoursesList from "../view/courses/store/CourseList";
// User
import { FilterSlice, UserInfoSlice } from "../view/user/store";
// News
import { CreateNewsSlice, NewsDetail, NewsList } from "../view/news/store";
// Products
import { CreateProductsSlice, ProductsList } from "../view/products/store";
// Events
import { EventsList, CreateEvent } from "../view/event/store";
// Shop
import { ShopList, CreateShopsSlice } from "../view/shops/store";
// Comments
import { CommentList } from "../view/comments/store";
//Building
import { BuildingList } from "../view/building/store";
// ClassRome
import ClassList from "../view/classrome/store";

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
  EventsList,
  CreateEvent,
  BuildingList,
  ClassList,
};

export default rootReducer;
