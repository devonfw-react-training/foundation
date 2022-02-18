import { render, screen, act } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { BookContext, BookService } from "../../services/BooksService";
import { Book } from "../../book";
import { BookDetails } from "./BookDetails";

describe("BookDetails", () => {
  const currentBook = {
    id: 1,
    title: "Example Book",
    authors: "John Example",
  };
  beforeAll(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });
  jest.useFakeTimers();
  let bookServiceMockPromise: Promise<Book>;
  const bookServiceMock = {
    findOne: () => {
      bookServiceMockPromise = Promise.resolve(currentBook);
      return bookServiceMockPromise;
    },
    save: (book: Book) => {
      bookServiceMockPromise = Promise.resolve(book);
      return bookServiceMockPromise;
    },
  } as unknown as BookService;

  const wrapper = ({ children }: any) => (
    <BookContext.Provider value={bookServiceMock}>
      <MemoryRouter>
        <Routes>
          <Route path="/" element={children} />
        </Routes>
      </MemoryRouter>
    </BookContext.Provider>
  );

  it("renders authors with a label", () => {
    // given
    act(() => {
      render(<BookDetails />, { wrapper });
      jest.runAllTimers();
    });
    // when
    return bookServiceMockPromise?.then(() => {
      const label = screen.getByText(/Authors:/i);
      const authorsInput = screen.getByLabelText(
        /Authors:/i,
      ) as HTMLInputElement;
      // then
      expect(label).toBeInTheDocument();
      expect(authorsInput.value).toBe(currentBook.authors);
    });
  });

  it("renders a title with a label", () => {
    // given
    act(() => {
      render(<BookDetails />, { wrapper });
      jest.runAllTimers();
    });
    // when
    return bookServiceMockPromise?.then(() => {
      const label = screen.getByText(/Title:/i);
      const titleInput = screen.getByLabelText(/Title:/i) as HTMLInputElement;
      // then
      expect(label).toBeInTheDocument();
      expect(titleInput.value).toBe(currentBook.title);
    });
  });
});
