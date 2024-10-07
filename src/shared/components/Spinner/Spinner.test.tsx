import { render, screen } from "@testing-library/react";
import { Spinner } from "./Spinner";

describe("Spinner Component", () => {
  it("renders with test id", () => {
    //given
    render(<Spinner />);
    // when
    const spinner = screen.getByTestId("spinner");
    // then
    expect(spinner).toBeInTheDocument();
  });
});
