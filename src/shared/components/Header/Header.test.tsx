import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";
import { Header } from "./Header";

describe("Header Component", () => {
  it("renders without crashing", () => {
    // given
    const div = document.createElement("div");
    // when
    ReactDOM.render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
      div,
    );
    // then no errors thrown
    ReactDOM.unmountComponentAtNode(div);
  });
});
