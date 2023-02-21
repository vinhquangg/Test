import * as ActionType from "./constants";
import { api } from "./../../../../utils/apiUtils";

const TIME_EXP = 3600000;

export const actAuthApi = (user, history) => {
  return (dispatch) => {
    dispatch(actAuthRequest());

    api
      .post("v1/auth/login", user)
      .then((result) => {
        dispatch(actAuthSuccess(result.data));
        // console.log(result.data.user.role);
        //Check maLoaiNguoiDung
        if (result.data.user.role === "Admin") {
          //lưu exp xuống localStorage
          const date = new Date().getTime();
          const exp = date + TIME_EXP;
          localStorage.setItem("exp", exp);

          //setTimeOut để logout
          dispatch(actSetTimeLogout(history, TIME_EXP));

          //Luu trang thai login
          localStorage.setItem("UserAdmin", JSON.stringify(result.data.token));

          //redirect dashboard
          history.replace("/dashboard");
          // console.log(result.data.role);

          // dispatch(actAuthSuccess(result.data));
        } else if (result.data.user.role === "QA Manager") {
          //lưu exp xuống localStorage
          const date = new Date().getTime();
          const exp = date + TIME_EXP;
          localStorage.setItem("exp", exp);

          //setTimeOut để logout
          dispatch(actSetTimeLogout(history, TIME_EXP));
          console.log(result);

          //Luu trang thai login
          localStorage.setItem("UserManager", JSON.stringify(result.data));

          //redirect dashboard
          history.replace("/QC/dashboard");

          //dispatch(actAuthSuccess(result.data));
        } else if (result.data.user.role === "Staff") {
          //lưu exp xuống localStorage
          const date = new Date().getTime();
          const exp = date + TIME_EXP;
          localStorage.setItem("exp", exp);

          //setTimeOut để logout
          dispatch(actSetTimeLogout(history, TIME_EXP));

          //Luu trang thai login
          localStorage.setItem("UserStaff", JSON.stringify(result.data));

          //redirect dashboard
          history.replace("/Staff/dashboard");
        }
      })
      .catch((error) => {
        dispatch(actAuthFailed(error));
      });
  };
};

export const actLogout = (history) => {
  //xoa localStorage
  localStorage.removeItem("UserAdmin");
  localStorage.removeItem("UserManager");
  localStorage.removeItem("UserStaff");
  localStorage.removeItem("exp");

  //redirect ve trang home
  history.replace("/");

  //clear reducer
  return {
    type: ActionType.AUTH_CLEAR_DATA,
  };
};

const actSetTimeLogout = (history, exp) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(actLogout(history));
    }, exp);
  };
};

//Trường hợp reload lại trang web
export const actTryLogin = (history) => {
  return (dispatch) => {
    const user = JSON.parse(localStorage.getItem("UserAdmin"));
    if (!user) return;

    //Tính toán thời gian exp
    const exp = localStorage.getItem("exp");
    const date = new Date().getTime();

    if (date > exp) {
      //logout
      dispatch(actLogout(history));
      return;
    }
    // console.log(exp - date);
    dispatch(actSetTimeLogout(history, exp - date));
    dispatch(actAuthSuccess(user));
  };
};

const actAuthRequest = () => {
  return {
    type: ActionType.AUTH_REQUEST,
  };
};

const actAuthSuccess = (data) => {
  return {
    type: ActionType.AUTH_SUCCESS,
    payload: data,
  };
};

const actAuthFailed = (error) => {
  return {
    type: ActionType.AUTH_FAILED,
    payload: error,
  };
};
