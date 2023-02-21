import * as ActionType from "./constants";
import { api } from "../../../../utils/apiUtils";
import { actFetchListDepartment } from "../modules/actions";

export const actFetchDeleteDepartment = (id) => {
  return (dispatch) => {
    dispatch(actDeleteDepartmentRequest());

    api
      .delete(`v1/department/${id}`)
      .then((result) => {
        dispatch(actDeleteDepartmentSuccess(result.data.content));
        dispatch(actFetchListDepartment());
      })
      .catch((err) => {
        dispatch(actDeleteDepartmentFailed(err));
      });
  };
};

const actDeleteDepartmentRequest = () => {
  return {
    type: ActionType.DELETE_DEPARTMENT_REQUEST,
  };
};

const actDeleteDepartmentSuccess = (data) => {
  return {
    type: ActionType.DELETE_DEPARTMENT_SUCCESS,
    payload: data,
  };
};

const actDeleteDepartmentFailed = (error) => {
  return {
    type: ActionType.DELETE_DEPARTMENT_FAILED,
    payload: error,
  };
};
