import { render, screen, fireEvent, act } from "@testing-library/react";
import { BookOverview } from "./BookOverview";
import { BookContext, BookService } from "../../services/BooksService";
import { Book } from "../../book";

describe("Book Overview Component", () => {
  beforeAll(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });
  jest.useFakeTimers();
  let bookServiceMockPromise: Promise<Book[]>;
  const bookServiceMock = {
    findAll() {
      bookServiceMockPromise = Promise.resolve([
        {
          id: 1,
          authors: "John Example",
          title: "Example Book",
        },
        {
          id: 2,
          authors: "Joe Smith",
          title: "Another Book",
        },
      ]);
      return bookServiceMockPromise;
    },
  } as BookService;

  const wrapper = ({ children }: any) => (
    <BookContext.Provider value={bookServiceMock}>
      {children}
    </BookContext.Provider>
  );

  it("renders the master table having three columns", () => {
    // given
    act(() => {
      render(<BookOverview />, { wrapper });
      jest.runAllTimers();
    });
    // when
    const noColumn = screen.getByText(/#/i);
    const authorsColumn = screen.getByText(/Authors/i);
    const titleColumn = screen.getByText(/Title/i);
    // then
    expect(noColumn).toBeInTheDocument();
    expect(authorsColumn).toBeInTheDocument();
    expect(titleColumn).toBeInTheDocument();
  });
  it("renders the master table rows", async () => {
    // given
    expect.hasAssertions();
    act(() => {
      render(<BookOverview />, { wrapper });
    });

    // when
    return bookServiceMockPromise.then(() => {
      const johnExamleRow = screen.getByText(/John Example/i);
      const joeSmithRow = screen.getByText(/Joe Smith/i);
      // then
      expect(johnExamleRow).toBeInTheDocument();
      expect(joeSmithRow).toBeInTheDocument();
    });
  });
  it("renders details upon click on the row", () => {
    // given
    act(() => {
      render(<BookOverview />, { wrapper });
      jest.runAllTimers();
    });
    // when
    return bookServiceMockPromise.then(() => {
      const row = screen.getByText(/John Example/i).closest("tr");
      row && fireEvent.click(row);
      // then
      expect(screen.getByText(/Authors:/i)).toBeInTheDocument();
    });
  });

  it("updates a book row upon changes done in the details", () => {
    // given
    act(() => {
      render(<BookOverview />, { wrapper });
      jest.runAllTimers();
    });
    // when
    return bookServiceMockPromise.then(() => {
      const row = screen.getByText(/John Example/i).closest("tr");
      row && fireEvent.click(row);
      const newAuthor = "New Author";
      const authors = screen.getByLabelText(/Authors:/i);
      fireEvent.change(authors, { target: { value: newAuthor } });
      const form = authors.closest("form");
      form && fireEvent.submit(form, { preventDefault: jest.fn() });
      row?.querySelector("td");
      const updatedAuthorCell = row?.querySelector("td");
      expect(updatedAuthorCell).toHaveTextContent(newAuthor);
    });
  });
});
