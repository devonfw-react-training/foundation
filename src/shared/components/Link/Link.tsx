import { styled } from "@mui/material/styles";
import { NavLink } from "react-router-dom";

export const Link = styled(NavLink)(({ theme }) => ({
  "&:hover": {
    color: theme.palette.secondary.main,
    textDecoration: "none",
  },
}));
