import ReactDOM from "react-dom";
import { BookDetails } from "./BookDetails";
import { render, screen } from "@testing-library/react";

describe("BookDetails", () => {
  const currentBook = {
    id: 1,
    title: "Example Book",
    authors: "John Example",
  };
  it("renders without crashing", () => {
    // given
    const div = document.createElement("div");
    // when
    ReactDOM.render(<BookDetails book={currentBook} />, div);
    // then no errors thrown
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders authors with a label", () => {
    // when
    render(<BookDetails book={currentBook} />);
    const label = screen.getByText(/Authors:/i);
    const authors = screen.getByText(/John Example/i);
    // then
    expect(label).toHaveTextContent("Authors:");
    expect(authors).toHaveTextContent(currentBook.authors);
  });

  it("renders a title with a label", () => {
    // when
    render(<BookDetails book={currentBook} />);
    const label = screen.getByText(/Title:/i);
    const title = screen.getByText(/Example Book/i);
    // then
    expect(label).toHaveTextContent("Title:");
    expect(title).toHaveTextContent(currentBook.title);
  });
});
