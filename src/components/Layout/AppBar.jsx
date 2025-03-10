import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import logo from "../../assets/logo.png";
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Button, Link, Stack, Typography } from '@mui/material';
import { useAuth } from "../../context/AuthContext";


export default function Header() {
  const { authInfo, setLogout } = useAuth() || {};
  const [anchorEl, setAnchorEl] = React.useState(null);



  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{display:'flex',justifyContent:"space-between"}}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => (window.location.href = "/")}
          >
            <img src={logo} alt="AYS Logo" className="w-10 h-10 rounded-full"/>
            <Typography sx={{fontWeight:"bold",fontSize:20,pl:2}}>Ays</Typography>
          </IconButton>


          {authInfo && authInfo.id_token ? ( <div>
  <IconButton
    size="large"
    aria-label="Account menu"
    aria-controls="user-menu"
    aria-haspopup="true"
    onClick={handleMenu}
    color="inherit"
    sx={{
      '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
      transition: 'all 0.3s ease'
    }}
  >
    <AccountCircle fontSize="30" sx={{ color: 'white' }} />
  </IconButton>

  <Menu
    id="user-menu"
    anchorEl={anchorEl}
    open={Boolean(anchorEl)}
    onClose={handleClose}
    PaperProps={{
      elevation: 4,
      sx: {
        borderRadius: 2,
        minWidth: 200,
        bgcolor: 'background.paper',
        '& .MuiMenuItem-root': {
          fontSize: '0.9rem',
          py: 1.5,
          '&:hover': {
            bgcolor: 'primary.main',
            color: 'white'
          }
        }
      }
    }}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    MenuListProps={{
      'aria-labelledby': 'user-menu',
    }}
    transitionDuration={200}
  >
    {/* Profile Section */}
    <Box px={2} py={1} borderBottom={1} borderColor="divider">
      <Typography variant="caption" color="text.secondary">
        {authInfo?.name}
      </Typography>
    </Box>

    <MenuItem 
      onClick={() => {
        handleClose();
        window.location.href = "/admin/overview";
      }}
      component={Link}
      to="/admin/overview"
    >
      {/* <Dashboard sx={{ mr: 2, fontSize: 20 }} /> */}
      Dashboard
    </MenuItem>

    <MenuItem 
      onClick={() => {
        handleClose();
        setLogout();
      }}
    >
      {/* <Logout sx={{ mr: 2, fontSize: 20 }} /> */}
      Logout
    </MenuItem>
  </Menu>
</div>) : (
                 <Stack flexDirection={"row"} display={"flex"} alignItems={"center"} gap={3}>
                 <Button
                   variant="outlined"
                   color="inherit"
                   onClick={() => (window.location.href = "/auth/login")}
                   className="text-white border-white hover:bg-white hover:text-blue-500"
                 >
                   Login
                 </Button>
                 <Button
                   variant="outlined"
                   color="inherit"
                   onClick={() => (window.location.href = "/auth/register")}
                    className="text-white border-white hover:bg-white hover:text-blue-500"
                 >
                   Register
                 </Button>
               </Stack>
            )}

        </Toolbar>
      </AppBar>
    </Box>
  );
}
