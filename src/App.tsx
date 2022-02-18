import { Component } from "react";
import { Typography } from "@mui/material";

interface State {
  title: string;
}

interface Props {}

class App extends Component<Props, State> {
  state = { title: "Hello World!" };

  render() {
    return (
      <Typography variant="h1" color="primary">
        {this.state.title}
      </Typography>
    );
  }
}

export default App;
