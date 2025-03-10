import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useAlert } from "../../context/AlertContext";
import SideNavBar from "../../components/Layout/SideNavBar";
import Overview from "./Overview";
import Claims from "./Claims";
import Resources from "./Resources";
import Organisations from "./Organisations";
import Account from "./Account";

const Dashboard = () => {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const { authInfo } = useAuth();
  const [section, setSection] = useState("overview");

  useEffect(() => {
    if (!authInfo.isLoggedIn) {
      showAlert("error", "Please login to access the dashboard");
      navigate("/auth/login");
    }
  }, []);

  const handleSectionChange = (section) => {
    if (section) {
      setSection(section);
    }
  };

  const renderSelectedSection = (handleSectionChange) => {
    switch (section) {
      case "overview":
        return <Overview handleSectionChange={handleSectionChange} />;
      case "claims":
        return <Claims />;
      case "resources":
        return <Resources />;
      case "organisations":
        return <Organisations />;
      case "account":
        return <Account />;
      default:
        return <Overview />;
    }
  };

  if (!authInfo.isLoggedIn) {
    return null; // Return nothing while redirecting
  }

  return (
    <div className="flex">
      <SideNavBar handleSectionChange={handleSectionChange} />
      {renderSelectedSection(handleSectionChange)}
    </div>
  );
};

export default Dashboard;
