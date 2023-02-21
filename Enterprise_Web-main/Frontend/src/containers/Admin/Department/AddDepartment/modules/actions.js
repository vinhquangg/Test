import * as ActionType from "./constants";
import { api } from "../../../../../utils/apiUtils";

export const actFetchAddDepartment = (department) => {
  return (dispatch) => {
    dispatch(actAddDepartmentRequest());

    api
      .post("v1/department", department)
      .then((result) => {
        dispatch(actAddDepartmentSuccess(result.data));
      })
      .catch((err) => {
        dispatch(actAddDepartmentFailed(err));
      });
  };
};

const actAddDepartmentRequest = () => {
  return {
    type: ActionType.ADD_DEPARTMENT_REQUEST,
  };
};

const actAddDepartmentSuccess = (data) => {
  return {
    type: ActionType.ADD_DEPARTMENT_SUCCESS,
    payload: data,
  };
};

const actAddDepartmentFailed = (error) => {
  return {
    type: ActionType.ADD_DEPARTMENT_FAILED,
    payload: error,
  };
};
