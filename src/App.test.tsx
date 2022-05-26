import { createRoot } from "react-dom/client";
import App from "./App";

it("renders without crashing", () => {
  // given
  const div = document.createElement("div");
  const root = createRoot(div!);
  // when
  root.render(<App />);
  // then no errors thrown
  root.unmount();
});
