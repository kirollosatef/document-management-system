import { createTheme } from "@mui/material/styles";
import "fontsource-tajawal";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976D2",
      accent: "#4CAF50 ",
    },
    secondary: {
      main: "#FF6F61",
    },
    background: {
      default: "#F8F8F8",
      alt: "#F5F5F5",
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
