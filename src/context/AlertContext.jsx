import React, { createContext, useContext, useState } from "react";
import { Alert } from "@mui/material";
import "../assets/css/alert.css";

const AlertContext = createContext();

export const useAlert = () => {
  return useContext(AlertContext);
};

const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState(null);

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {alert && (
        <div className="alert-container">
          <Alert severity={alert.type} onClose={() => setAlert(null)}>
            {alert.message}
          </Alert>
        </div>
      )}
    </AlertContext.Provider>
  );
};

export default AlertProvider;
