import React from "react";
import { createTheme } from "@mui/material";
import { lime, green, indigo } from "@mui/material/colors";

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
      main: green[500],
    },
    secondary: {
      main: "#009688",
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
