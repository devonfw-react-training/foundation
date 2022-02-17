import {
  render,
  screen,
  act,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
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
      <MemoryRouter>
        <Routes>
          <Route path="/" element={children} />
          <Route
            path="/book-app/book/1"
            element={<div>Book Details Component</div>}
          />
        </Routes>
      </MemoryRouter>
    </BookContext.Provider>
  );

  it("renders spinner before books are load", () => {
    // given
    act(() => {
      render(<BookOverview />, { wrapper });
      jest.runAllTimers();
    });
    // when
    const spinner = screen.getByTestId("spinner");
    // then
    expect(spinner).toBeInTheDocument();
  });

  it("renders the master table having three columns", () => {
    // given
    expect.hasAssertions();
    act(() => {
      render(<BookOverview />, { wrapper });
      jest.runAllTimers();
    });
    // when
    return bookServiceMockPromise.then(() => {
      const noColumn = screen.getByText(/#/i);
      const authorsColumn = screen.getByText(/Authors/i);
      const titleColumn = screen.getByText(/Title/i);
      // then
      expect(noColumn).toBeInTheDocument();
      expect(authorsColumn).toBeInTheDocument();
      expect(titleColumn).toBeInTheDocument();
    });
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
  it("change path after row click", () => {
    // given
    act(() => {
      render(<BookOverview />, { wrapper });
      jest.runAllTimers();
    });
    // when
    return bookServiceMockPromise.then(() => {
      const row = screen.getByText(/John Example/i).closest("tr");
      row && fireEvent.click(row);
      expect(screen.getByText(/Book Details Component/i)).toBeVisible();
    });
  });
});
