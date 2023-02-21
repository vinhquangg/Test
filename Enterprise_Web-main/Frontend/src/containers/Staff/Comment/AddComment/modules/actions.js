import * as ActionType from "./constants";
import { api } from "../../../../../utils/apiUtils";

export const actFetchAddComment = (comment) => {
  return (dispatch) => {
    dispatch(actAddCommentRequest());

    api
      .post("v1/comment", comment)
      .then((result) => {
        dispatch(actAddCommentSuccess(result.data));
      })
      .catch((err) => {
        dispatch(actAddCommentFailed(err));
      });
  };
};

const actAddCommentRequest = () => {
  return {
    type: ActionType.ADD_COMMENT_REQUEST,
  };
};

const actAddCommentSuccess = (data) => {
  return {
    type: ActionType.ADD_COMMENT_SUCCESS,
    payload: data,
  };
};

const actAddCommentFailed = (error) => {
  return {
    type: ActionType.ADD_COMMENT_FAILED,
    payload: error,
  };
};
