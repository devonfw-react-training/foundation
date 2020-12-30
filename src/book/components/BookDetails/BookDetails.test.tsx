import { BookDetails } from "./BookDetails";
import { render, screen } from "@testing-library/react";

describe("BookDetails", () => {
  it("renders authors with a label", () => {
    render(<BookDetails />);
    const currentBook = {
      id: 1,
      title: "Example Book",
      authors: "John Example",
    };
    const label = screen.getByText(/Authors:/i);
    const authors = screen.getByText(/John Example/i);
    expect(label).toHaveTextContent("Authors:");
    expect(authors).toHaveTextContent(currentBook.authors);
  });
  it("renders a title with a label", () => {
    render(<BookDetails />);
    const currentBook = {
      id: 1,
      title: "Example Book",
      authors: "John Example",
    };
    const label = screen.getByText(/Title:/i);
    const title = screen.getByText(/Example Book/i);
    expect(label).toHaveTextContent("Title:");
    expect(title).toHaveTextContent(currentBook.title);
  });
});
