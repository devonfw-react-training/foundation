import { createRoot } from "react-dom/client";
import { Header } from "./Header";

describe("Header Component", () => {
  it("renders without crashing", () => {
    // given
    const div = document.createElement("div");
    const root = createRoot(div!);
    // when
    root.render(<Header />);
    // then no errors thrown
    root.unmount();
  });
});
