import * as ActionType from "./constants";
import { api } from "./../../../../../utils/apiUtils";

export const actFetchEditUser = (id) => {
  return (dispatch) => {
    dispatch(actEditUserRequest());

    api
      .get(`v1/users/${id}`)
      .then((result) => {
        dispatch(actEditUserSuccess(result.data));
        // console.log(result.data);
      })
      .catch((err) => {
        dispatch(actEditUserFailed(err));
      });
  };
};

const actEditUserRequest = () => {
  return {
    type: ActionType.EDIT_USER_REQUEST,
  };
};

const actEditUserSuccess = (data) => {
  return {
    type: ActionType.EDIT_USER_SUCCESS,
    payload: data,
  };
};

const actEditUserFailed = (error) => {
  return {
    type: ActionType.EDIT_USER_FAILED,
    payload: error,
  };
};
