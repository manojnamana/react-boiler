import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import RegisterConfirmation from "../pages/Auth/RegisterConfirmation";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import ResetPassword from "../pages/Auth/ResetPassword";

const AuthRoute = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/cofirm" element={<RegisterConfirmation />} />
      <Route path="/password-reset" element={<ForgotPassword />} />
      <Route path="/password-reset-confirm" element={<ResetPassword />} />
    </Routes>
  );
};

export default AuthRoute;
