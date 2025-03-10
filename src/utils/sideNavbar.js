import React from "react";
import {
  Home,
  Assignment,
  Folder,
  CorporateFare,
} from "@mui/icons-material";

export const getSideNavItems = () => {
  // TODO: Add role based options
  return [
    { name: "Overview", icon: <Home />, path: "/admin/overview" },
    { name: "Claims", icon: <Assignment />, path: "/admin/claims" },
    {
      name: "Organisations",
      icon: <CorporateFare />,
      path: "/admin/organisations",
    },
    { name: "Resources", icon: <Folder />, path: "/admin/claimresources" },

  ];
};
