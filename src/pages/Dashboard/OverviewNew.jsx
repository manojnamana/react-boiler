import {
  AccessTime,
  CheckCircleOutline,
  HighlightOff,
} from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Claims from "../../components/Claims/PendingClaims";
import Overview from "../../assets/overView.png";
import { useAuth } from "../../context/AuthContext";
import { getUserAnalayticsClaimsSummary } from "../../services/overviewService";
import { getHomeOverviewImages } from "../../utils/common";

const OverviewNew = () => {
  const { authInfo } = useAuth() || {};
  const { user_id } = authInfo || {};
  const [data, setdata] = useState({});
  const [loading, setLoading] = useState(true);
  const carouselImages = getHomeOverviewImages();

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await getUserAnalayticsClaimsSummary(user_id);
        setdata(response.data.claims_by_status);
        setLoading(false);
      } catch (error) {
        console.error("error : failed to fetch");
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [user_id]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  return (
    <Box
      sx={{
        minHeight: "100vh",
        p: 4,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          borderRadius: 6,
          p: 3,
          display: "flex",
          flexDirection: "column",
          gap: 3,
          width: "100%",
        }}
      >
        <Grid container spacing={1} alignItems={"center"}>
          <Grid item xs={12} md={8}>
            <Paper
              elevation={3}
              sx={{
                p: 5,
                borderRadius: 5,
                color: "white",
                bgcolor: "black",
              }}
            >
              <Typography fontWeight={"bold"} fontSize={20}>
                Welcome back 👋
              </Typography>
              <Typography fontWeight={"bold"} fontSize={20}>
                {authInfo?.name}
              </Typography>

              <Box
                display={"flex"}
                justifyContent={"space-between"}
                mt={0}
                alignItems={"center"}
              >
                <Typography sx={{ color: "gray" }}>
                  Your unique sorted solution for managing claims and
                  organizations
                </Typography>
                <Stack flexDirection={"row"}>
                  <img src={Overview} alt="overView" width={50} />
                  <img
                    src="https://assets.minimals.cc/public/assets/illustrations/characters/character-3.webp"
                    width={40}
                    alt="overview2"
                  />
                </Stack>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper
              elevation={3}
              sx={{
                borderRadius: 5,
                bgcolor: "black",
                width: "-webkit-fill-available",
                p: 3,
                alignItems: "center",
              }}
              fullWidth
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <img
                  src={carouselImages[0]}
                  alt="image-banner"
                  style={{
                    borderRadius: 20,
                    maxHeight: 188,
                    width: "100%",
                  }}
                />
              </div>
            </Paper>
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ borderRadius: 5, p: 3 }}>
              <Stack>
                <Typography>Total Approved Claims</Typography>
                <Box display={"flex"} justifyContent={"space-between"}>
                  <Typography fontSize={25} fontWeight={"bold"}>
                    {data?.approved}
                  </Typography>
                  <CheckCircleOutline
                    color="success"
                    style={{ fontSize: 40 }}
                  />
                </Box>

                {/* <Typography>+2.6%
            last 7 days</Typography> */}
              </Stack>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ borderRadius: 5, p: 3 }}>
              <Stack>
                <Typography>Total Pending Claims</Typography>
                <Box display={"flex"} justifyContent={"space-between"}>
                  <Typography fontSize={25} fontWeight={"bold"}>
                    {data?.pending}
                  </Typography>
                  <AccessTime color="warning" style={{ fontSize: 40 }} />
                </Box>
              </Stack>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ borderRadius: 5, p: 3 }}>
              <Stack>
                <Typography>Total Rejected Claims</Typography>
                <Box display={"flex"} justifyContent={"space-between"}>
                  <Typography fontSize={25} fontWeight={"bold"}>
                    {data?.rejected}
                  </Typography>
                  <HighlightOff color="error" style={{ fontSize: 40 }} />
                </Box>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
        <Claims />
      </Paper>
    </Box>
  );
};

export default OverviewNew;
