import * as ActionType from "./constants";
import { api } from "./../../../../../utils/apiUtils";

export const actFetchAddUser = (user) => {
  return (dispatch) => {
    dispatch(actAddUserRequest());

    api
      .post("v1/users", user)
      .then((result) => {
        dispatch(actAddUserSuccess(result.data.content));
      })
      .catch((err) => {
        dispatch(actAddUserFailed(err));
      });
  };
};

const actAddUserRequest = () => {
  return {
    type: ActionType.ADD_USER_REQUEST,
  };
};

const actAddUserSuccess = (data) => {
  return {
    type: ActionType.ADD_USER_SUCCESS,
    payload: data,
  };
};

const actAddUserFailed = (error) => {
  return {
    type: ActionType.ADD_USER_FAILED,
    payload: error,
  };
};
