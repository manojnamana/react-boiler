import React, { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";

// Create the Auth Context
const AuthContext = createContext();

const LoginRedirect = () => {
  const handleLoginRedirect = () => {
    window.location.href = "/auth/login";
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "background.default",
        textAlign: "center",
        p: 3,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Session expired!
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        Please click the button below to login again.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleLoginRedirect}
        sx={{ px: 4, py: 2 }}
      >
        Login
      </Button>
    </Box>
  );
};

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [authInfo, setAuthInfo] = useState(
    sessionStorage.getItem("auth")
      ? JSON.parse(sessionStorage.getItem("auth"))
      : null
  );

  const setLogin = (authInfo) => {
    setAuthInfo(authInfo || null);
    sessionStorage.setItem("auth", JSON.stringify(authInfo));
  };

  const setLogout = () => {
    sessionStorage.removeItem("auth");
    setAuthInfo(null);
    window.location.href = "/";
  };

  // const url = window.location.href;
  // const is_open_route = url.includes("/auth");

  return (
    <AuthContext.Provider value={{ authInfo, setLogin, setLogout }}>
      {/* {(authInfo && authInfo.id_token) || is_open_route ? (
        children
      ) : (
        <LoginRedirect />
      )} */}
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use Auth Context
export const useAuth = () => {
  return useContext(AuthContext);
};
