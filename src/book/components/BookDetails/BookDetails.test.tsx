import { createRoot } from "react-dom/client";
import { BookDetails } from "./BookDetails";
import { render, screen, waitFor } from "@testing-library/react";

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
    const root = createRoot(div!);
    // when
    root.render(<BookDetails book={currentBook} onBookChange={callbackMock} />);
    // then no errors thrown
    root.unmount();
  });

  it("renders authors with a label", async () => {
    // given
    render(<BookDetails book={currentBook} onBookChange={callbackMock} />);
    // when
    const authorsInput = screen.getByLabelText(/Authors/i) as HTMLInputElement;
    // then
    await waitFor(() => expect(authorsInput.value).toBe(currentBook.authors));
  });

  it("renders a title with a label", async () => {
    // given
    render(<BookDetails book={currentBook} onBookChange={callbackMock} />);
    // when
    const titleInput = screen.getByLabelText(/Title/i) as HTMLInputElement;
    // then
    await waitFor(() => expect(titleInput.value).toBe(currentBook.title));
  });
});
