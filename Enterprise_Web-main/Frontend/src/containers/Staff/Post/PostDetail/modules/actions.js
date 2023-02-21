import * as ActionType from "./constants";
import { api } from "./../../../../../utils/apiUtils";

export const actFetchDetailPost = (id) => {
  return (dispatch) => {
    dispatch(actDetailPostRequest());

    api
      .get(`v1/post/${id}`)
      .then((result) => {
        dispatch(actDetailPostSuccess(result.data));
        // console.log(result.data);
      })
      .catch((err) => {
        dispatch(actDetaiPostFailed(err));
      });
  };
};

const actDetailPostRequest = () => {
  return {
    type: ActionType.DETAIL_POST_REQUEST,
  };
};

const actDetailPostSuccess = (data) => {
  return {
    type: ActionType.DETAIL_POST_SUCCESS,
    payload: data,
  };
};

const actDetaiPostFailed = (error) => {
  return {
    type: ActionType.DETAIL_POST_FAILED,
    payload: error,
  };
};
