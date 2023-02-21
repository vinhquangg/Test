import * as ActionType from "./constants";
import { api } from "../../../../../utils/apiUtils";

export const actFetchAddCategory = (category) => {
  return (dispatch) => {
    dispatch(actAddCategoryRequest());

    api
      .post("v1/category", category)
      .then((result) => {
        dispatch(actAddCategorySuccess(result.data));
      })
      .catch((err) => {
        dispatch(actAddCategoryFailed(err));
      });
  };
};

const actAddCategoryRequest = () => {
  return {
    type: ActionType.ADD_CATEGORY_REQUEST,
  };
};

const actAddCategorySuccess = (data) => {
  return {
    type: ActionType.ADD_CATEGORY_SUCCESS,
    payload: data,
  };
};

const actAddCategoryFailed = (error) => {
  return {
    type: ActionType.ADD_CATEGORY_FAILED,
    payload: error,
  };
};
