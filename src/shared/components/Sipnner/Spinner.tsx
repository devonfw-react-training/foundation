import { CircularProgress, Stack } from "@mui/material";

export const Spinner = () => (
  <Stack alignItems="center" data-testid="spinner">
    <CircularProgress />
  </Stack>
);
