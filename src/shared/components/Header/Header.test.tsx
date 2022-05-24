import { createRoot } from "react-dom/client";

import { Header } from "./Header";

describe("Header Component", () => {
  it("renders without crashing", () => {
    // given
    const div = document.createElement("div");
    // when
    const root = createRoot(div);
    root.render(<Header />);
    // then no errors thrown
    root.unmount();
  });
});
