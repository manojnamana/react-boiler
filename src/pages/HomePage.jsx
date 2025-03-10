import React from "react";
import { Button, Box, Typography, Container, Paper, Grid, Divider } from "@mui/material";
import { useAuth } from "../context/AuthContext";

import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/AppBar";

const HomePage = () => {
  const { authInfo } = useAuth() || {};
  const isLoggedIn = authInfo && authInfo.id_token;

  return (
    <>
    <Header/>
    <Divider/>
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", backgroundColor: "white" }}>
      {/* Hero Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          px: 6,
          py: 16,
          backgroundColor: "primary.main",
          color: "primary.contrastText",
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to AYS - Your Claims Management Platform
        </Typography>
        <Typography variant="body1" sx={{ maxWidth: "600px", mb: 8 }}>
          AYS is your comprehensive solution for managing claims, supporting organizations, and assisting users. Streamline your claims process with our intuitive and powerful platform.
        </Typography>
        {isLoggedIn ? (
          <Button
            variant="contained"
            
            sx={{ px: 6, py: 3,bgcolor:'white',color:"text.primary" }}
            onClick={() => (window.location.href = "/admin/overview")}
          >
            Go to Dashboard
          </Button>
        ) : (
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="contained"
              
              sx={{ px: 6, py: 3,bgcolor:'white',color:"text.primary" }}
              onClick={() => (window.location.href = "/auth/login")}
            >
              Get Started
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              sx={{ px: 6, py: 3, borderColor: "secondary.main", color: "secondary.main" }}
              onClick={() => (window.location.href = "/auth/register")}
            >
              Learn More
            </Button>
          </Box>
        )}
      </Box>

      {/* Features Section */}
      <Container sx={{ py: 16, textAlign: "center" }}>
        <Typography variant="h3" component="h2" color="text.primary" gutterBottom>
          Features
        </Typography>
        <Grid container spacing={4} justifyContent="center" alignItems={"center"}>
          <Grid item xs={12} sm={6} md={4} >
            <Paper elevation={3} sx={{ p: 6, backgroundColor: "white", color: "text.primary",height:250 }}>
              <Typography variant="h4" component="h3" gutterBottom>
                Efficient Claims Processing
              </Typography>
              <Typography variant="body1">
                Automate and manage claims efficiently with our streamlined process.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}  >
            <Paper elevation={3} sx={{ p: 6, backgroundColor: "white", color: "text.primary",height:250 }}>
              <Typography variant="h4" component="h3" gutterBottom>
                Organization Support
              </Typography>
              <Typography variant="body1">
                Provide comprehensive support to organizations with our robust tools.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4} >
            <Paper elevation={3} sx={{ p: 6, backgroundColor: "white", color: "text.primary",height:250 }}>
              <Typography variant="h4" component="h3" gutterBottom>
                User Assistance
              </Typography>
              <Typography variant="body1">
                Assist users effectively with our user-friendly interface and support features.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Call to Action Section */}
      <Box sx={{ py: 16, backgroundColor: "primary.dark", color: "primary.contrastText", textAlign: "center" }}>
        <Typography variant="h3" component="h2" gutterBottom>
          Get Started with AYS Today
        </Typography>
        <Typography variant="body1" sx={{ maxWidth: "600px", mx: "auto", mb: 8 }}>
          Take the first step in transforming your claims management process. Sign up for free and experience the efficiency of AYS.
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          sx={{ px: 6, py: 3 }}
          onClick={() => (window.location.href = "/auth/register")}
        >
          Register Now
        </Button>
      </Box>
    </Box>
    <Footer/>
    </>
  );
};

export default HomePage;