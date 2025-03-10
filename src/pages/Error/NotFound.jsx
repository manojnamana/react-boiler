import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-600 mb-4">
          Oops! Page Not Found
        </h2>
        <p className="text-gray-500 mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/")}
          className="mt-4"
        >
          Go to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
