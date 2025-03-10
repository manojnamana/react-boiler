import React from "react";
import { AppBar, Button } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/logo.png";

const Header = () => {
  const { authInfo, setLogout } = useAuth() || {};

  return (
    <AppBar
      position="static"
      sx={{
        padding: "16px 0px",
      }}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo and Site Name */}
        <div
          className="flex items-center space-x-2"
          onClick={() => (window.location.href = "/")}
        >
          <img src={logo} alt="AYS Logo" className="w-10 h-10 rounded-full" />
          <h1 className="text-2xl font-bold">AYS</h1>
        </div>
        <div className="flex space-x-4">
          {authInfo && authInfo.id_token ? (
            <>
              <span className="text-gray-200 self-center">
                Welcome, {authInfo?.name}!
              </span>
              <Button
                variant="outlined"
                color="inherit"
                onClick={() => setLogout()}
                className="text-white border-white hover:bg-white hover:text-blue-500"
              >
                Logout
              </Button>
              <Button
                variant="contained"
                color="inherit"
                onClick={() => (window.location.href = "/admin/overview")} // TODO: Add redirection based on user role
                className="bg-white text-blue-500 hover:bg-gray-200"
              >
                Dashboard
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outlined"
                color="inherit"
                onClick={() => (window.location.href = "/auth/login")}
                className="text-white border-white hover:bg-white hover:text-blue-500"
              >
                Login
              </Button>
              <Button
                variant="contained"
                color="inherit"
                onClick={() => (window.location.href = "/auth/register")}
                className="bg-white text-blue-500 hover:bg-gray-200"
              >
                Register
              </Button>
            </>
          )}
        </div>
      </div>
    </AppBar>
  );
};

export default Header;
