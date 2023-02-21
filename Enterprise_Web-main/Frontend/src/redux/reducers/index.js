import { combineReducers } from "redux";
import authReducer from "../../containers/Admin/AuthPage/modules/reducer";
import listUserReducer from "../../containers/Admin/User/modules/reducer";
import addUserReducer from "../../containers/Admin/User/AddUser/modules/reducer";
import updateUserReducer from "../../containers/Admin/User/EditUser/update/modules/reducer";
import editUserReducer from "../../containers/Admin/User/EditUser/modules/reducer";
import listDepartmentReducer from "../../containers/Admin/Department/modules/reducer";
import addDepartmentReducer from "../../containers/Admin/Department/AddDepartment/modules/reducer";
import listCategoryReducer from "../../containers/QC_Manager/Category/modules/reducer";
import addCategoryReducer from "../../containers/QC_Manager/Category/AddCategory/modules/reducer";
import listPostReducer from "../../containers/Staff/Post/modules/reducer";
import addPostReducer from "../../containers/Staff/Post/AddPost/modules/reducer";
import detailPostReducer from "../../containers/Staff/Post/PostDetail/modules/reducer";
import listCommentReducer from "../../containers/Staff/Comment/modules/reducer";
import addCommentReducer from "../../containers/Staff/Comment/AddComment/modules/reducer";

const rootReducer = combineReducers({
  authReducer,
  listUserReducer,
  addUserReducer,
  updateUserReducer,
  editUserReducer,
  listDepartmentReducer,
  addDepartmentReducer,
  listCategoryReducer,
  addCategoryReducer,
  listPostReducer,
  addPostReducer,
  detailPostReducer,
  listCommentReducer,
  addCommentReducer,
});

export default rootReducer;
