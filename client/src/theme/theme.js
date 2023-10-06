import { createTheme } from "@mui/material/styles";
import "fontsource-tajawal";

const theme = createTheme({
  palette: {
    primary: {
      main: "#007ACC",
    },
    secondary: {
      main: "#FF6F61",
    },
    background: {
      default: "#F8F8F8",
    },
  },
  typography: {
    fontFamily: "Tajawal, sans-serif",
    fontSize: 16,
  },
  spacing: 4,
  direction: "rtl",
});

export default theme;
