import React from "react";
import { Box, Typography, Link } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        backgroundColor: "primary.main",
        color: "text.secondary",
        textAlign: "center",
      }}
    >
      <Typography variant="body2" color="white">© 2025 AYS. All Rights Reserved.</Typography>
      <Typography variant="body2">
        <Link href="/terms" color="white" underline="hover">
          Terms of Service
        </Link>{" "}
        |{" "}
        <Link href="/privacy" color="white" underline="hover">
          Privacy Policy
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;