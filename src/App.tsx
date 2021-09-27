import { ConnectedRouter } from "connected-react-router";
import React, { lazy, Suspense } from "react";
import { Provider } from "react-redux";
import { Redirect, Route, Switch } from "react-router";
import "react-toastify/dist/ReactToastify.css";
import { PersistGate } from "redux-persist/integration/react";
import "./App.scss";
import configureStore from "./boot/configureStore";
import LoadingComponent from "./containers/components/loading";
import "./polyfill";
const LoginComponent = lazy(() => import("screens/login"));
const DashboardComponent = lazy(() => import("screens/dashboard"));
const store = configureStore.setup();
const AuthRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem("user_info");
  return (
    <Route
      {...rest}
      render={(props) => (token ? <Component {...props} /> : <Redirect to={{ pathname: "/login" }} />)}
    />
  );
};
export default function App() {
  return (
    <Provider store={store.store}>
      <PersistGate loading={null} persistor={store.persistor}>
        <LoadingComponent />
        <ConnectedRouter history={configureStore.history}>
          <Suspense fallback={<LoadingComponent />}>
            <Switch>
              <Route path="/login">
                <Route exact path="/login" component={LoginComponent} />
              </Route>
              <Redirect path="/" exact to="/dashboard" />
              <AuthRoute path="/dashboard" component={DashboardComponent} />
            </Switch>
          </Suspense>
        </ConnectedRouter>
      </PersistGate>
    </Provider>
  );
}
