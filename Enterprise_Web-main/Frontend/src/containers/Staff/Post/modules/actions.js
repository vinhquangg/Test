import * as ActionType from "./constants";
import { api } from "../../../../utils/apiUtils";

export const actFetchListPost = () => {
  return (dispatch) => {
    dispatch(actListPostRequest());

    api
      .get("v1/post")
      .then((result) => {
        dispatch(actListPostSuccess(result.data));
        // console.log(result);
      })
      .catch((err) => {
        dispatch(actListPostFailed(err));
      });
  };
};

const actListPostRequest = () => {
  return {
    type: ActionType.LIST_POST_REQUEST,
  };
};

const actListPostSuccess = (data) => {
  return {
    type: ActionType.LIST_POST_SUCCESS,
    payload: data,
  };
};

const actListPostFailed = (error) => {
  return {
    type: ActionType.LIST_POST_FAILED,
    payload: error,
  };
};
