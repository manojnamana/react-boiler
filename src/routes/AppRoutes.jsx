import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthRoute from "./AuthRoute";
import AdminRoute from "./AdminRoute";
import HomePage from "../pages/HomePage";
import NotFound from "../pages/Error/NotFound";
import TermsAndConditions from "../pages/Policy/TermsAndConditions";
import PrivacyPolicy from "../pages/Policy/PrivacyPolicy";
import ClaimsRoute from "./ClaimsRoute";
import OrganisationRoute from "./OrganisationRoute";
import ResourcesRoute from "./ResourcesRoute";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth/*" element={<AuthRoute />} />
        <Route path="/admin/*" element={<AdminRoute />} />
        <Route path="/claims/*" element={<ClaimsRoute />} />
        <Route path="/organisation/*" element={<OrganisationRoute />} />
        <Route path ="/claimresources/*" element={<ResourcesRoute/>}/>
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
