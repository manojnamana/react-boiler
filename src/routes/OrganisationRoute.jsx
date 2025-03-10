import React from "react";
import { Route, Routes } from "react-router-dom";
import OrganisationLayout from "../layouts/OrganisationLayout";
import OrganisationClaims from "../pages/Dashboard/OrganisationClaims";

const OrganisationRoute = () => {
  return (
    <OrganisationLayout>
      <Routes>
        <Route path="/claims/" element={<OrganisationClaims />} />
      </Routes>
    </OrganisationLayout>
  );
};

export default OrganisationRoute;
