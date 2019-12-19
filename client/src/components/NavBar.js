// src/components/NavBar.js

import React from "react";
import { useAuth0 } from "../react-auth0-spa";
import { Link } from "react-router-dom";
import { Menu, Button } from 'semantic-ui-react';

const NavBar = () => {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  return (

    <Menu pointing secondary>
      <Menu.Item>
        <Link to="/">Resto</Link>&nbsp;
      </Menu.Item>
      <Menu.Menu position='right'>
        <Menu.Item>
          {!isAuthenticated && (<Link to="/how-it-works" >How it Works</Link>)}

          {isAuthenticated && <Link to="/my-orders">My Orders</Link>}
        </Menu.Item>
        <Menu.Item>
          <Link to="/menu">Menu</Link>
        </Menu.Item>
        <Menu.Item>
          {isAuthenticated && (<Link to="/profile">Profile</Link>)}
        </Menu.Item>
        <Menu.Item>
          {isAuthenticated && user && user.admin && (<Link to="/admin">Admin</Link>)}
        </Menu.Item>
        <Menu.Item>
          {!isAuthenticated && (
            <Button
              onClick={() =>
                loginWithRedirect({})
              }
            >
              Log in
            </Button>
          )}

          {isAuthenticated && <Button onClick={() => logout()}>Log out</Button>}
        </Menu.Item>
      </Menu.Menu>
    </Menu>

  );
};

export default NavBar;
