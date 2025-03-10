import React from "react";
import { Route, Routes } from "react-router-dom";

import ClaimLayout from "../layouts/ClaimLayout";
import ClaimDetail from "../pages/Claims/ClaimDetail";

const ClaimsRoute = () => {
  return (
    <ClaimLayout>
      <Routes>
        <Route  path="/detail/" element={<ClaimDetail />} />
      </Routes>
    </ClaimLayout>
  );
};

export default ClaimsRoute;
