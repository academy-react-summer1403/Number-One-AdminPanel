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
//Building
import { BuildingList } from "../view/building/store";

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
  EventsList,
  CreateEvent,
  BuildingList,
};

export default rootReducer;
