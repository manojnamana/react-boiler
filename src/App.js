import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import AlertProvider from "./context/AlertContext";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AlertProvider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </AlertProvider>
    </ThemeProvider>
  );
};

export default App;
