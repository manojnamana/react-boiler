import React, { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton, 
  Typography,
  Divider,
  Box,
} from "@mui/material";
import { AccountCircle, Logout } from "@mui/icons-material";
import { getSideNavItems } from "../../utils/sideNavbar";
import logo from "../../assets/logo.png";
import { useAuth } from "../../context/AuthContext";

const SideNavBar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { setLogout } = useAuth() || {};
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location

  const navItems = getSideNavItems();

  // Function to map certain paths to a sidebar section
  const getActivePath = (path) => {
    if (typeof window === "undefined") return path; // Handle SSR case
  
    const { pathname, search } = window.location;
    const params = new URLSearchParams(search);
  
    if (pathname.startsWith("/claims/detail") && params.has("claim_id")) {
      return "/admin/claims";
    }
    if (pathname.startsWith("/claimresources/detail") && params.has("claim_id")) {
      return "/admin/claimresources";
    }
    if (pathname.startsWith("/organisation/claims") && params.has("user_id")) {
      return "/admin/organisations";
    }
    return pathname; // Default case
  };
  

  const activePath = getActivePath(location.pathname);

  return (
    <Drawer
      variant="permanent"
      open={isOpen}
      sx={{
        width: 240,
        overflowX: "hidden",
        "& .MuiDrawer-paper": {
          width: 240,
          color: "#ffffff",
          transition: "width 0.3s",
          bgcolor: "#11062c",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        },
      }}
    >
      <Box p={1}>
        <IconButton onClick={() => navigate(`/`)}>
          {isOpen ? (
            <div className="flex items-center w-full gap-4">
              <img src={logo} alt="AYS Logo" className="w-10 h-10 rounded-full" />
              <Typography variant="h6" color="white" fontWeight={"bold"} pl={1}>Ays</Typography>
            </div>
          ) : (
            <img src={logo} alt="AYS Logo" className="w-10 h-10 rounded-full" />
          )}
        </IconButton>
        <Divider />

        <List>
          {navItems.map((item) => {
            const isActive = activePath.startsWith(item.path); // Check if mapped path matches item path
            return (
              <ListItem
                button
                key={item.name}
                component={NavLink}
                to={item.path}

                sx={{
                  my:1,
                  bgcolor: isActive ? "#322945" : "transparent", // Highlight active button
                  borderRadius: 2,
                  ":hover": { bgcolor: "#322945" },
                }}
              >
                <ListItemIcon sx={{ color: "#ffffff" }}>{item.icon}</ListItemIcon>
                {isOpen && <ListItemText primary={item.name} />}
              </ListItem>
            );
          })}
        </List>
      </Box>

      <Box p={1} display={"flex"} flexDirection={"column"} gap={1}>
        <Divider />
        <ListItem
          button
          component={NavLink}
          to={'/admin/account'}
          sx={{
            bgcolor: activePath.startsWith("/admin/account") ? "#322945" : "transparent",
            borderRadius: 2,
            ":hover": { bgcolor: "#322945" },
          }}
        >
          <ListItemIcon sx={{ color: "#ffffff" }}><AccountCircle /></ListItemIcon>
          {isOpen && <ListItemText primary={"Account"} />}
        </ListItem>
        <ListItem
          button
          onClick={() => setLogout()}
          sx={{
            ":hover": { bgcolor: "#322945", borderRadius: 2 },
          }}
        >
          <ListItemIcon sx={{ color: "#ffffff" }}><Logout /></ListItemIcon>
          {isOpen && <ListItemText primary={"Logout"} />}
        </ListItem>
      </Box>
    </Drawer>
  );
};

export default SideNavBar;
