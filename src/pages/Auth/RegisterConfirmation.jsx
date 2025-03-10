import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Stack, IconButton } from "@mui/material";
import { confirmRegistration } from "../../services/authService";
import { useAlert } from "../../context/AlertContext";
import logo from '../../assets/logo.png'

const RegisterConfirmation = () => {
  const [formData, setFormData] = useState({
    username: "",
    confirmation_code: "",
  });
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await confirmRegistration(
        formData.username,
        formData.confirmation_code
      );
      if (response.status === 200) {
        showAlert("success", "Confirmation successful");
        navigate("/auth/login");
      } else if (response.status === 422) {
        console.error(response.data);
        showAlert("error", response.data.detail[0].msg);
      } else {
        console.error(response.data);
        showAlert("error", "Registration failed, please try again");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="bg-white shadow-md rounded-lg p-8 w-96">
      <Stack flexDirection={"row"} justifyContent={"center"} mb={1}>
          <IconButton sx={{border:0}} onClick={()=>navigate(`/`)}>
          <img src={logo} alt="AYS Logo" className="w-10 h-10 text-center rounded-full"/>
          </IconButton>
          </Stack>
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Confirm Registration
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <TextField
              fullWidth
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              variant="outlined"
              size="small"
              required
              className="bg-gray-50"
            />
          </div>
          <div className="mb-4">
            <TextField
              fullWidth
              label="Confirmation Code"
              name="confirmation_code"
              value={formData.confirmation_code}
              onChange={handleChange}
              variant="outlined"
              size="small"
              required
              className="bg-gray-50"
            />
          </div>
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            className="bg-blue-500 hover:bg-blue-700"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default RegisterConfirmation;
