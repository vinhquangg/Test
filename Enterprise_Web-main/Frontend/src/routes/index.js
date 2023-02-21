import { lazy } from "react";
import AdminTemplate from "../containers/Admin";
import QCManagerTemplate from "../containers/QC_Manager";
import StaffTemplate from "../containers/Staff";
const routesAdmin = [
  {
    exact: false,
    path: "/dashboard",
    component: lazy(() => import("../containers/Admin/Dashboard")),
  },
];

const routesQC = [
  {
    exact: false,
    path: "/QC/dashboard",
    component: lazy(() => import("../containers/QC_Manager/Dashboard")),
  },
];

const routesStaff = [
  {
    exact: false,
    path: "/Staff/dashboard",
    component: lazy(() => import("../containers/Staff/Dashboard")),
  },
];

function renderRouteAdmin() {
  return routesAdmin.map((route, index) => {
    return (
      <AdminTemplate
        key={index}
        exact={route.exact}
        path={route.path}
        Component={route.component}
      />
    );
  });
}

function renderRouteQC() {
  return routesQC.map((route, index) => {
    return (
      <QCManagerTemplate
        key={index}
        exact={route.exact}
        path={route.path}
        Component={route.component}
      />
    );
  });
}

function renderRouteStaff() {
  return routesStaff.map((route, index) => {
    return (
      <StaffTemplate
        key={index}
        exact={route.exact}
        path={route.path}
        Component={route.component}
      />
    );
  });
}

export { renderRouteAdmin, renderRouteQC, renderRouteStaff };
