import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import { isAdmin } from "../utils/isAdmin";

const MobileNavLinks = () => {
  const { logout, user } = useAuth0();

  return (
    <>
      {isAdmin(user?.email) && (
        <Link to="/admin" className=" font-bold hover: text-green-600">
          Admin
        </Link>
      )}
      <Link
        to="/order-status"
        className="flex bg-white text-black items-center font-bold hover:text-green-600"
      >
        Order Status
      </Link>
      <Link
        to="/user-profile"
        className="flex bg-white text-black items-center font-bold hover:text-green-600"
      >
        User Profile
      </Link>
      <Link
        to="/manage-restaurant"
        className="flex bg-white text-black items-center font-bold hover:text-green-600"
      >
        Manage Restaurant
      </Link>
      <Button
        onClick={() => logout()}
        className="flex items-center px-3 font-bold bg-white text-green-600 border border-green-600 hover:bg-green-600 hover:text-white"
      >
        Logout
      </Button>
    </>
  );
};

export default MobileNavLinks;
