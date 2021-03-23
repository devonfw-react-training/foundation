import ReactDOM from "react-dom";
import { BookDetails } from "./BookDetails";
import { render, screen } from "@testing-library/react";

describe("BookDetails", () => {
  const currentBook = {
    id: 1,
    title: "Example Book",
    authors: "John Example",
  };
  const callbackMock = jest.fn();
  it("renders without crashing", () => {
    // given
    const div = document.createElement("div");
    // when
    ReactDOM.render(
      <BookDetails book={currentBook} onBookChange={callbackMock} />,
      div,
    );
    // then no errors thrown
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders authors with a label", () => {
    // given
    render(<BookDetails book={currentBook} onBookChange={callbackMock} />);
    // when
    const label = screen.getByText(/Authors:/i);
    const authorsInput = screen.getByLabelText(/Authors:/i) as HTMLInputElement;
    // then
    expect(label).toBeInTheDocument();
    expect(authorsInput.value).toBe(currentBook.authors);
  });

  it("renders a title with a label", () => {
    // given
    render(<BookDetails book={currentBook} onBookChange={callbackMock} />);
    // when
    const label = screen.getByText(/Title:/i);
    const titleInput = screen.getByLabelText(/Title:/i) as HTMLInputElement;
    // then
    expect(label).toBeInTheDocument();
    expect(titleInput.value).toBe(currentBook.title);
  });
});
