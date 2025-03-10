import React from "react";
import SideNavBar from "../components/Layout/SideNavBar";

const OrganisationLayout = (props) => {
  return (
    <div className="flex w-full">
      <SideNavBar />
      <div className="w-full  bg-violet-100">{props?.children}</div>
    </div>
  );
};

export default OrganisationLayout;
