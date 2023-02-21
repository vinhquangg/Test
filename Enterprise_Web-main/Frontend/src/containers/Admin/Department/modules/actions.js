import * as ActionType from "./constants";
import { api } from "../../../../utils/apiUtils";

export const actFetchListDepartment = () => {
  return (dispatch) => {
    dispatch(actListDepartmentRequest());

    api
      .get("v1/department")
      .then((result) => {
        dispatch(actListDepartmentSuccess(result.data));
        // console.log(result);
      })
      .catch((err) => {
        dispatch(actListDepartmentFailed(err));
      });
  };
};

const actListDepartmentRequest = () => {
  return {
    type: ActionType.LIST_DEPARTMENT_REQUEST,
  };
};

const actListDepartmentSuccess = (data) => {
  return {
    type: ActionType.LIST_DEPARTMENT_SUCCESS,
    payload: data,
  };
};

const actListDepartmentFailed = (error) => {
  return {
    type: ActionType.LIST_DEPARTMENT_FAILED,
    payload: error,
  };
};
