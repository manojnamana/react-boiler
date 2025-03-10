import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#8257dc", // Dark blue-grey
    },
    secondary: {
      main: "#ECF0F1", // Light grey
    },
    background: {
      default: "#f5f5f5", // Light grey background
      paper: "#ffffff", // White paper background
    },
    text: {
      primary: "#2C3E50", // Dark blue-grey text
      secondary: "#757575", // Grey text
    },
    // action: {
    //   active: "#f6f5f7", // Dark blue-grey active elements
    //   hover: "#322945", // Slightly lighter blue-grey for hover
    //   selected: "#1A5276", // Darker blue for selected elements
      
    // },
    divider: "#BDBDBD", // Light grey for dividers
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
});

export default theme;