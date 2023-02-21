import * as ActionType from "./constants";
import { api } from "../../../../../utils/apiUtils";

export const actFetchAddPost = (post) => {
  return (dispatch) => {
    dispatch(actAddPostRequest());

    api
      .post("v1/post", post)
      .then((result) => {
        dispatch(actAddPostSuccess(result.data));
      })
      .catch((err) => {
        dispatch(actAddPostFailed(err));
      });
  };
};

const actAddPostRequest = () => {
  return {
    type: ActionType.ADD_POST_REQUEST,
  };
};

const actAddPostSuccess = (data) => {
  return {
    type: ActionType.ADD_POST_SUCCESS,
    payload: data,
  };
};

const actAddPostFailed = (error) => {
  return {
    type: ActionType.ADD_POST_FAILED,
    payload: error,
  };
};
