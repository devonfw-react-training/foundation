import { createTheme } from "@mui/material";
import { lime, indigo, teal, cyan } from "@mui/material/colors";

const lightTheme = createTheme({
  palette: {
    primary: {
      main: indigo[500],
    },
    secondary: {
      main: lime[500],
    },
  },
  typography: {
    fontFamily: "'Hubballi', cursive",
    fontSize: 20,
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: teal[600],
    },
    secondary: {
      main: cyan[500],
    },
  },
  typography: {
    fontFamily: "'Hubballi', cursive",
    fontSize: 20,
  },
});

export const theme = {
  light: lightTheme,
  dark: darkTheme,
};
