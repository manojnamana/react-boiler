import React from "react";
import { Route, Routes } from "react-router-dom";
import OverviewNew from "../pages/Dashboard/OverviewNew";
import Claims from "../pages/Dashboard/Claims";
import Account from "../pages/Dashboard/Account";
import AdminLayout from "../layouts/AdminLayout";
import ClaimResorces from "../pages/ClaimResources/ClaimResources";
import Organisations from "../pages/Dashboard/Organisations";

const AdminRoute = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/overview" element={<OverviewNew />} />
        <Route path="/claims" element={<Claims />} />
        <Route path="/claimresources" element={<ClaimResorces />} />
        <Route path="/organisations" element={<Organisations />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminRoute;
