import * as ActionType from "./constants";
import { api } from "../../../../utils/apiUtils";

export const actFetchListComment = () => {
  return async (dispatch) => {
    dispatch(actListCommentRequest());

    api
      .get("v1/comment")
      .then((result) => {
        dispatch(actListCommentSuccess(result.data));
        // console.log(result.data);
      })
      .catch((err) => {
        dispatch(actListCommentFailed(err));
      });
  };
};

const actListCommentRequest = () => {
  return {
    type: ActionType.LIST_COMMENT_REQUEST,
  };
};

const actListCommentSuccess = (data) => {
  return {
    type: ActionType.LIST_COMMENT_SUCCESS,
    payload: data,
  };
};

const actListCommentFailed = (error) => {
  return {
    type: ActionType.LIST_COMMENT_FAILED,
    payload: error,
  };
};
