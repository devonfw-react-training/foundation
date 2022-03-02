import { FC, useState } from "react";
import { Box, AppBar, Typography, Tabs, Tab, Grid } from "@mui/material";
import { ThemeSwitch } from "../ThemeSwitch/ThemeSwitch";
import { Link } from "../Link/Link";

interface Props {
  toggleTheme: () => void;
}

export const Header: FC<Props> = ({ toggleTheme }) => {
  const [currentTab, setCurrentTab] = useState("/book-app/books");

  const handleChange = (event: React.SyntheticEvent, newTab: string) => {
    setCurrentTab(newTab);
  };

  return (
    <Box mb={3}>
      <AppBar position="static">
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item>
            <Typography variant="h5" p={2} color="secondary">
              Books App
            </Typography>
          </Grid>
          <Grid item mr={4}>
            <ThemeSwitch color="secondary" onChange={toggleTheme} />
          </Grid>
        </Grid>

        <Tabs value={currentTab} onChange={handleChange} textColor="inherit">
          <Tab
            label="Book Overview"
            value="/book-app/books"
            to="/book-app/books"
            component={Link}
          />
          <Tab
            label="New Book"
            value="/book-app/book"
            to="/book-app/book"
            component={Link}
          />
          <Tab
            label="User list"
            value="/users/list"
            to="/users/list"
            component={Link}
          />
          <Tab
            label="New User"
            value="/users/new"
            to="/users/new"
            component={Link}
          />
        </Tabs>
      </AppBar>
    </Box>
  );
};
