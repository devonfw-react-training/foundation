import { BookDetails } from "./BookDetails";
import { render, screen } from "@testing-library/react";

describe("BookDetails", () => {
  it("renders authors with a label", () => {
    // given
    render(<BookDetails />);

    // when
    const label = screen.getByText(/Authors:/i);
    const authors = screen.getByText(/John Example/i);

    // then
    expect(label).toBeInTheDocument();
    expect(authors).toBeInTheDocument();
  });
  it("renders a title with a label", () => {
    // given
    render(<BookDetails />);

    // when
    const label = screen.getByText(/Title:/i);
    const title = screen.getByText(/Example Book/i);

    // then
    expect(label).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });
});
