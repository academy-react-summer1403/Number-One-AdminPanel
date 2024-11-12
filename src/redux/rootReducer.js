// ** Reducers Imports
import layout from "./layout";
import navbar from "./navbar";
import UserInfoSlice from "../view/user/store/UserInfoSlice";
import FilterSlice from "../view/user/store/FilterSlice";

const rootReducer = { navbar, layout, UserInfoSlice, FilterSlice };

export default rootReducer;
