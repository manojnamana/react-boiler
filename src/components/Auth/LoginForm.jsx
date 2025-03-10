import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import {
  TextField,
  Button,
  Alert,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Stack,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { login } from "../../services/authService";
import { useAlert } from "../../context/AlertContext";
import { useAuth } from "../../context/AuthContext";
// import { getUserDetails } from "../../services/userService";
import logo from '../../assets/logo.png'
import Cookies from 'js-cookie';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const { setLogin } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(formData.identifier, formData.password);
      if (response.status === 200) {
        const { data } = response;
        const { message, ...loginInfo } = data || {};
        showAlert("success", message);
        setLogin(loginInfo);
        navigate("/admin/overview");
        Cookies.set('token', response.data.id_token, { expires: 7 });
        console.log(response?.data?.access_token
        )
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
      
        <h2 className="text-2xl font-bold text-center text-gray-600 mb-6">
          WELCOME BACK TO AYS
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <TextField
              fullWidth
              label="Username or Email"
              name="identifier"
              value={formData.identifier}
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
            Login
          </Button>
        </form>
        <div className="flex justify-between mt-4">
          <NavLink
            to="/auth/password-reset"
            className="text-blue-500 hover:underline"
          >
            Forgot Password?
          </NavLink>
        </div>
        <Alert severity="info" className="mt-2">
          <span className="text-gray-600">
            Don't have an account?{" "}
            <NavLink
              to="/auth/register"
              className="text-blue-500 hover:underline"
            >
              Register
            </NavLink>
          </span>
        </Alert>
      </div>
    </div>
  );
};

export default LoginForm;
