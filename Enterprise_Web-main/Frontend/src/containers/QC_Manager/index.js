import React from "react";
import { Route, Redirect } from "react-router-dom";
import Sidebar from "./_component/sidebar";
function LayoutQC(props) {
  return (
    <>
      <Sidebar />
      {props.children}
    </>
  );
}

export default function QCTemplate({ Component, ...props }) {
  return (
    <Route
      {...props}
      render={(propsRoute) => {
        if (localStorage.getItem("UserManager")) {
          return (
            <LayoutQC>
              <Component {...propsRoute} />
            </LayoutQC>
          );
        }
        return <Redirect to="/" />;
      }}
    />
  );
}
