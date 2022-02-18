import { Box, AppBar, Typography } from "@mui/material";

export const Header = () => (
  <Box mb={3}>
    <AppBar position="static">
      <Typography variant="h5" p={2}>
        Books App
      </Typography>
    </AppBar>
  </Box>
);
