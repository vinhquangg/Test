import React from "react";
import { Route, Redirect } from "react-router-dom";
import Sidebar from "./_component/sidebar";
function LayoutStaff(props) {
  return (
    <>
      <Sidebar />
      {props.children}
    </>
  );
}

export default function StaffTemplate({ Component, ...props }) {
  return (
    <Route
      {...props}
      render={(propsRoute) => {
        if (localStorage.getItem("UserStaff")) {
          return (
            <LayoutStaff>
              <Component {...propsRoute} />
            </LayoutStaff>
          );
        }
        return <Redirect to="/" />;
      }}
    />
  );
}
