import { Component } from "react";
import { Box, Button, Typography } from "@mui/material";

interface State {
  title: string;
}

interface Props {}

class App extends Component<Props, State> {
  state = { title: "Hello World!" };

  render() {
    return (
      <Box>
        <Typography variant="h1" color="primary">
          {this.state.title}
        </Typography>
        <Button onClick={() => this.setState({ title: "New Title" })}>
          Change title
        </Button>
      </Box>
    );
  }
}

export default App;
