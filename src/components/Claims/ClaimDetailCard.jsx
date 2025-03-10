import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const ClaimDetailCard = ({ claimDetails }) => {
  if (!claimDetails) {
    return null;
  }
  return (
    <Card className="mb-6 shadow-md w-full mi">
      <CardContent>
        <Typography variant="h5" className="font-bold mb-4">
          Claim Information
        </Typography>
        <Typography>
          <strong>Title:</strong> {claimDetails.title}
        </Typography>
        <Typography>
          <strong>Description:</strong> {claimDetails.description}
        </Typography>
        <Typography>
          <strong>Status:</strong> {claimDetails.status}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ClaimDetailCard;
