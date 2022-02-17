import React from "react";
import { CircularProgress, Stack } from "@mui/material";

export const Spinner = () => (
  <Stack alignItems="center" data-testId="spinner">
    <CircularProgress />
  </Stack>
);
