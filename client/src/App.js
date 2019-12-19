import React from "react";
import NavBar from "./components/NavBar";
import { useAuth0 } from "./react-auth0-spa";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Profile from "./components/Profile";
import ExternalApi from "./views/ExternalApi";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./components/Home";
import HowItWorks from "./components/HowItWorks";
import Menu from "./components/Menu";
import MyOrders from "./components/MyOrders";
import Admin from "./components/admin/Admin";
import AdminMenu from "./components/admin/Menu";
import MenuForm from "./components/admin/MenuForm";
import AdminPrivateRoute from "./components/admin/AdminPrivateRoute";

function App() {
  const { loading } = useAuth0();

  if (loading) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <div className="App">
      <BrowserRouter>
        <header>
          <NavBar />
        </header>
        <Switch>
          <Route path="/menu" component={Menu} />
          <Route path="/how-it-works" component={HowItWorks} />
          <PrivateRoute path="/my-orders" component={MyOrders} />
          <PrivateRoute path="/profile" component={Profile} />
	        <PrivateRoute path="/external-api" component={ExternalApi} />
          <AdminPrivateRoute path="/admin" component={Admin} />
          <AdminPrivateRoute path="/update-menu" component={AdminMenu} />
          <AdminPrivateRoute path="/create-menu" component={MenuForm} food={{}} />
          <Route path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
