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

//Categories
import { BlogCategoryList } from "../view/news/add-category/store";
import { TechnologiesList } from "../view/courses/category-manage/store";
import { StatusList } from "../view/courses/status-manage/store";
import { LevelsList } from "../view/courses/level-manage/store";
import { ShopCategoryList } from "../view/shops/category-manage/store";
import { ProductCategoryList } from "../view/products/catgory-manage/store";
//Building
import { BuildingList } from "../view/building/store";
// ClassRome
import ClassList from "../view/classrome/store";
// Department
import DepartmentList from "../view/department/store";
// Term
import TermList from "../view/term/store";
// Support
import SupportSlice from "../view/support/store";
// Assistance Work
import AssistanceWorkList from "../view/assistance-work/store";
// Assistance Course
import AssistanceCourseSlice from "../view/courses/store/AssistanceCourseSlice";
// Schedual
import SchedualSlice from "../view/schedual/store";
import SchedualTeacherSlice from "../view/schedual/store/SchedualTeacher";
import SchedualUserSlice from "../view/schedual/store/SchedualUser";
// Job History
import JobHistorySlice from "../view/job-history/store";
// Course User
import CourseUserSlice from "../view/course-user/store";

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
  BlogCategoryList,
  TechnologiesList,
  StatusList,
  LevelsList,
  ShopCategoryList,
  ProductCategoryList,
  BuildingList,
  ClassList,
  DepartmentList,
  TermList,
  SupportSlice,
  AssistanceWorkList,
  AssistanceCourseSlice,
  SchedualSlice,
  JobHistorySlice,
  CourseUserSlice,
  SchedualTeacherSlice,
  SchedualUserSlice,
};

export default rootReducer;
