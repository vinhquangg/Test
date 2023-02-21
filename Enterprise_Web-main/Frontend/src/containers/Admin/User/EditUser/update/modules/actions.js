import * as ActionType from "./constants";
import { api } from "./../../../../../../utils/apiUtils";

export const actFetchUpdateUser = (data, history, id) => {
  return (dispatch) => {
    dispatch(actUpdateUserRequest());

    api
      .put(`v1/users/${id}`, data)
      .then((result) => {
        dispatch(actUpdateUserSuccess(result.data));
        alert(result.data.content);
        history.push("/dashboard/user");
        // console.log(data);
      })
      .catch((err) => {
        dispatch(actUpdateUserFailed(err));
      });
  };
};

const actUpdateUserRequest = () => {
  return {
    type: ActionType.UPDATE_USER_REQUEST,
  };
};

const actUpdateUserSuccess = (data) => {
  return {
    type: ActionType.UPDATE_USER_SUCCESS,
    payload: data,
  };
};

const actUpdateUserFailed = (error) => {
  return {
    type: ActionType.UPDATE_USER_FAILED,
    payload: error,
  };
};
