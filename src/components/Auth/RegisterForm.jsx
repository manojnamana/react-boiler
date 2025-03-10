import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  TextField,
  Button,
  Alert,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Stack,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import TextFieldPhoneInput from "./TextFieldPhoneInput";
import { register } from "../../services/authService";
import { useAlert } from "../../context/AlertContext";
import { useNavigate } from "react-router-dom";
import logo from '../../assets/logo.png'

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone_number: "",
    name: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    phone_number: "",
    name: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePhoneChange = (phone) => {
    if (!phone) {
      return;
    }
    // if (phone.length > 12) {
    //   setErrors({
    //     ...errors,
    //     phone_number: "Invalid phone number length",
    //   });
    //   return;
    // }
    setFormData({
      ...formData,
      phone_number: phone,
    });
    if (!isValidPhoneNumber(phone)) {
      setErrors({
        ...errors,
        phone_number: "Invalid phone number",
      });
    } else {
      setErrors({
        ...errors,
        phone_number: "",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    for (const key in formData) {
      if (formData[key] === "") {
        setErrors({
          ...errors,
          [key]: "This field is required",
        });
        return;
      }
    }
    setErrors({
      username: "",
      email: "",
      phone_number: "",
      name: "",
      password: "",
    });
    try {
      const response = await register(
        formData.username,
        formData.email,
        formData.phone_number,
        formData.name,
        formData.password
      );
      if (response.status === 200) {
        showAlert("success", "Registration successful");
        localStorage.setItem("auth_user", JSON.stringify(response.data));
        navigate("/auth/cofirm");
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
          WELCOME TO AYS
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
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              variant="outlined"
              size="small"
              type="email"
              required
              className="bg-gray-50"
            />
          </div>
          <div className="mb-4">
            <PhoneInput
              id="phone_number"
              name="phone_number"
              type="tel"
              countries={["US"]}
              defaultCountry="US"
              value={formData.phone_number}
              onChange={(phone) => handlePhoneChange(phone)}
              placeholder="Enter phone number"
              inputComponent={TextFieldPhoneInput}
            />
            {errors.phone_number && (
              <Alert severity="error" className="mt-2">
                {errors.phone_number}
              </Alert>
            )}
          </div>
          <div className="mb-4">
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              variant="outlined"
              size="small"
              required
              className="bg-gray-50"
            />
          </div>
          <div className="mb-4">
            <OutlinedInput
              fullWidth
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              variant="outlined"
              size="small"
              required
              className="bg-gray-50"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword
                        ? "hide the password"
                        : "display the password"
                    }
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseDown={(e) => e.preventDefault()}
                    onMouseUp={(e) => e.preventDefault()}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </div>
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            className="bg-blue-500 hover:bg-blue-700"
          >
            Register
          </Button>
        </form>

        <Alert severity="info" className="mt-2">
          <span className="text-gray-600">
            Have an account already?{" "}
            <NavLink to="/auth/login" className="text-blue-500 hover:underline">
              Login
            </NavLink>
          </span>
        </Alert>
      </div>
    </div>
  );
};

export default RegisterForm;
