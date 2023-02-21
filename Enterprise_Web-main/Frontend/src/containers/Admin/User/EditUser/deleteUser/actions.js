import * as ActionType from "./constants";
import { api } from "../../../../../utils/apiUtils";
import { actFetchListUser } from "../../modules/actions";

export const actFetchDeleteUser = (id) => {
  return (dispatch) => {
    dispatch(actDeleteUserRequest());

    api
      .delete(`v1/users/${id}`)
      .then((result) => {
        dispatch(actDeleteUserSuccess(result.data.content));
        dispatch(actFetchListUser());
      })
      .catch((err) => {
        dispatch(actDeleteUserFailed(err));
      });
  };
};

const actDeleteUserRequest = () => {
  return {
    type: ActionType.DELETE_USER_REQUEST,
  };
};

const actDeleteUserSuccess = (data) => {
  return {
    type: ActionType.DELETE_USER_SUCCESS,
    payload: data,
  };
};

const actDeleteUserFailed = (error) => {
  return {
    type: ActionType.DELETE_USER_FAILED,
    payload: error,
  };
};
