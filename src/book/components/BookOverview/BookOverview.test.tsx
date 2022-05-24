import { createRoot } from "react-dom/client";

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
    const root = createRoot(div);
    root.render(<BookOverview />);

    // then no errors thrown
    root.unmount();
  });
});
