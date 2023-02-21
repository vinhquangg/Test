import * as ActionType from "./constants";
import { api } from "../../../../utils/apiUtils";
import { actFetchListCategory } from "../modules/actions";

export const actFetchDeleteCategory = (id) => {
  return (dispatch) => {
    dispatch(actDeleteCategoryRequest());

    api
      .delete(`v1/category/${id}`)
      .then((result) => {
        dispatch(actDeleteCategorySuccess(result.data.content));
        dispatch(actFetchListCategory());
      })
      .catch((err) => {
        dispatch(actDeleteCategoryFailed(err));
      });
  };
};

const actDeleteCategoryRequest = () => {
  return {
    type: ActionType.DELETE_CATEGORY_REQUEST,
  };
};

const actDeleteCategorySuccess = (data) => {
  return {
    type: ActionType.DELETE_CATEGORY_SUCCESS,
    payload: data,
  };
};

const actDeleteCategoryFailed = (error) => {
  return {
    type: ActionType.DELETE_CATEGORY_FAILED,
    payload: error,
  };
};
