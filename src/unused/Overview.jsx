import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Divider,
  Grid2,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getUserClaims } from "../services/claimService";
import { isNotNullOrEmptyArray } from "../utils/common";

const Overview = ({ handleSectionChange }) => {
  const { authInfo } = useAuth();
  const { user_id } = authInfo || {};
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [claimsStats, setClaimsStats] = useState(null);
  const [pendingClaims, setPendingClaims] = useState([]);
  const [error, setError] = useState(null);
  
  const fetchData = async () => {
      if(!user_id) {
        return;
      }
      try {
        setLoading(true);
        // Fetch claims data
        const claims = await getUserClaims(user_id);
        if (!claims || claims.status !== 200) {
          throw new Error("Failed to fetch claims");
        }
        const { data } = claims || {};
        const { pending, accepted, rejected } = data.reduce((acc, claim) => {
          let claimStatus = String(claim.change_status).toLowerCase();
          acc[claimStatus] = (acc[claimStatus] || 0) + 1;
          return acc;
        }, {
          pending: 0,
          accepted: 0,
          rejected: 0,
        });

        setClaimsStats({
          pending: pending,
          accepted: accepted,
          rejected: rejected,
        });
        let pendingClaims = data.filter(claim => claim.change_status === "PENDING");
        setPendingClaims(pendingClaims);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    // Fetch claims data

    fetchData();
  }, [user_id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Typography color="error">{error}</Typography>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 w-full">
      {/* Welcome Message */}
      <h2 className="text-3xl font-bold text-gray-700 mb-6">
        Hello, {authInfo.name}!
      </h2>

      {/* Claims Summary Section */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        <Card className="shadow-md">
          <CardContent>
            <Typography variant="h5" component="div" className="text-blue-600">
              Pending Claims
            </Typography>
            <Typography variant="h4" className="text-gray-700">
              {claimsStats.pending}
            </Typography>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardContent>
            <Typography variant="h5" component="div" className="text-green-600">
              Accepted Claims
            </Typography>
            <Typography variant="h4" className="text-gray-700">
              {claimsStats.accepted}
            </Typography>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardContent>
            <Typography variant="h5" component="div" className="text-red-600">
              Rejected Claims
            </Typography>
            <Typography variant="h4" className="text-gray-700">
              {claimsStats.rejected}
            </Typography>
          </CardContent>
        </Card>
      </section>

      {/* Pending Claims Section */}
      <section className="bg-white shadow-md rounded-lg p-6 mb-12">
        <h3 className="text-2xl font-bold text-gray-700 mb-4">
          Pending Claims
        </h3>
        <ul className="space-y-4">
          {isNotNullOrEmptyArray(pendingClaims) && pendingClaims.slice(0,3).map((claim) => (
            <>
              <Grid2 container spacing={1}>
                <Grid2 size={{ xs: 12, md: 8 }} className="text-gray-600">
                  <strong>{claim.title}</strong> - {claim.description}
                </Grid2>
                <Grid2 size={{ xs: 12, md: 4 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => navigate(`/claims/detail/${claim.claim_id}`)}
                  >
                    View Details
                  </Button>
                </Grid2>
              </Grid2>
              <Divider variant="middle" />
            </>
          ))}
        </ul>
      </section>

      {/* Redirect to Claims List Section */}
      <section className="text-center py-8 bg-white shadow-md rounded-lg">
        <Typography variant="h6" className="text-gray-700 mb-4">
          View all claims in one place
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => handleSectionChange("claims")}
        >
          Go to Claims List
        </Button>
      </section>
    </div>
  );
};

export default Overview;
