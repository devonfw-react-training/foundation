import { Component } from "react";
import { Title } from "./App.css";

interface State {
  title: string;
}

interface Props {}

class App extends Component<Props, State> {
  state = { title: "Hello World!" };

  render() {
    return <Title>{this.state.title}</Title>;
  }
}

export default App;
