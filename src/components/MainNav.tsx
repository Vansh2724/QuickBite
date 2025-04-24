import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import UsernameMenu from "./UsernameMenu";
import { Link } from "react-router-dom";
import React from "react";
import { isAdmin } from "../utils/isAdmin";

const MainNav = () => {
  const { loginWithRedirect, isAuthenticated, user } = useAuth0();

  return (
    <span className="flex space-x-2 items-center">
      {isAuthenticated ? (
        <>
          {isAdmin(user?.email) && (
            <Link to="/admin" className=" font-bold hover: text-green-600">
              Admin
            </Link>
          )}

          <Link to="/order-status" className=" font-bold hover: text-green-600">
            Order Status
          </Link>
          <UsernameMenu />
        </>
      ) : (
        <Button
          variant="ghost"
          className="font-bold text-green-600 border hover:text-white hover:bg-green-600"
          style={{ borderColor: "#34D399" }}
          onClick={async () => await loginWithRedirect()}
        >
          Log In
        </Button>
      )}
    </span>
  );
};

export default MainNav;
