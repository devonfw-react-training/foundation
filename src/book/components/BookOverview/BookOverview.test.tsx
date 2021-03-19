import ReactDOM from "react-dom";

import { BookOverview } from "./BookOverview";

describe("Book Overview Component", () => {
  const books = [
    {
      id: 1,
      authors: "John Example",
      title: "Example Book",
    },
    {
      id: 2,
      authors: "Joe Smith",
      title: "Another Book",
    },
  ];

  it("renders without crashing", () => {
    // given
    const div = document.createElement("div");
    // when
    ReactDOM.render(<BookOverview />, div);
    // then no errors thrown
    ReactDOM.unmountComponentAtNode(div);
  });
});
