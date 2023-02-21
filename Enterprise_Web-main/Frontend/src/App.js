import "./App.css";
import "./index.css";
import { createBrowserHistory } from "history";
import { Route, Switch, withRouter } from "react-router-dom";
import { renderRouteAdmin, renderRouteQC, renderRouteStaff } from "./routes";
import { Suspense, lazy } from "react";
import Loader from "./components/Loader";
import ScrollToTop from "./components/ScrollToTop";
// import { actTryLogin } from "./containers/Home/LoginPage/modules/actions";
import { actTryLogin } from "./containers/Admin/AuthPage/modules/actions";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const history = createBrowserHistory();

function App(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actTryLogin(props.history));
  }, []);

  return (
    <Suspense
      fallback={
        <>
          <Loader />
        </>
      }
    >
      <ScrollToTop />
      <Switch>
        {renderRouteAdmin()}
        {renderRouteQC()}
        {renderRouteStaff()}

        <Route
          path="/"
          exact
          component={lazy(() => import("./containers/Admin/AuthPage"))}
        />
      </Switch>
    </Suspense>
  );
}

export default withRouter(App);
