import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { useAuth0 } from "../../react-auth0-spa";

const AdminPrivateRoute = ({ component: Component, path, ...rest }) => {
  const { loading, isAuthenticated, loginWithRedirect, user } = useAuth0();

  useEffect(() => {
    if (loading || isAuthenticated) {
      return;
    }
    const fn = async () => {
      await loginWithRedirect({
        appState: { targetUrl: path }
      });
    };
    fn();
  }, [loading, isAuthenticated, user, loginWithRedirect, path]);

  const render = props => (isAuthenticated === true && user.admin === true) ? <Component {...props} /> : null;

  return <Route path={path} render={render} {...rest} />;
};

export default AdminPrivateRoute;