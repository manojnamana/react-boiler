import React from "react";
import { Route, Routes } from "react-router-dom";
import { ResorceLayout } from "../layouts/ResorceLayout";
import Resources from "../pages/Dashboard/Resources";

const ResourcesRoute = () => {
  return (
    <ResorceLayout>
      <Routes>
        <Route path="/detail/" element={<Resources />} />
      </Routes>
    </ResorceLayout>
  );
};

export default ResourcesRoute;
