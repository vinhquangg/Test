import * as ActionType from "./constants";
import { api } from "../../../../utils/apiUtils";

export const actFetchListCategory = () => {
  return async (dispatch) => {
    dispatch(actListCategoryRequest());

    api
      .get("v1/category")
      .then((result) => {
        dispatch(actListCategorySuccess(result.data));
        // console.log(result.data);
      })
      .catch((err) => {
        dispatch(actListCategoryFailed(err));
      });
  };
};

const actListCategoryRequest = () => {
  return {
    type: ActionType.LIST_CATEGORY_REQUEST,
  };
};

const actListCategorySuccess = (data) => {
  return {
    type: ActionType.LIST_CATEGORY_SUCCESS,
    payload: data,
  };
};

const actListCategoryFailed = (error) => {
  return {
    type: ActionType.LIST_CATEGORY_FAILED,
    payload: error,
  };
};
