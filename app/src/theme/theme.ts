import { createTheme } from "@mui/material/styles";

export const defaultTheme = {
  custom: {
    isRedesign: false,
  },
  palette: {
    primary: {
      main: "#00aa66",
      light: "#99ddc2",
      dark: "#00844f",
    },
  },
};

const theme = createTheme(defaultTheme);

export default theme;
