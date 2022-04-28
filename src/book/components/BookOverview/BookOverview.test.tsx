import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { BookOverview } from "./BookOverview";
import { BookContext, getURI, useBooks } from "../../services/BooksService";
import { Book } from "../../book";
import userEvent from "@testing-library/user-event";
import { BookDetails } from "../BookDetails/BookDetails";

const mockedResponseBooks: Book[] = [
  {
    id: 1,
    authors: "Julius Verne",
    title: "80 days around the world",
  },
  {
    id: 2,
    authors: "Frank Herbert",
    title: "Dune",
  },
];
interface HttpRequestConfig {
  method: "GET" | "POST" | "PUT" | "DELETE";
  headers: { "Content-Type": string };
  body: any;
}

const mockFetch = async function mockFetch(
  url: string,
  payload: HttpRequestConfig,
) {
  switch (url) {
    case getURI("books"): {
      return {
        ok: true,
        json: async () => mockedResponseBooks,
      };
    }
    case getURI("books/1"): {
      if (payload && payload.method === "PUT") {
        return {
          ok: true,
          json: async () => JSON.parse(payload.body),
        };
      }
      return {
        ok: true,
        json: async () => mockedResponseBooks[0],
      };
    }
    default: {
      throw new Error(`Unhandled request: ${url}`);
    }
  }
};

const WrapperComponent = ({ children }: any) => (
  <BookContext.Provider value={useBooks()}>
    <MemoryRouter>
      <Routes>
        <Route path="/" element={children} />
        <Route path="/book-app/book/1" element={<BookDetails />} />
      </Routes>
    </MemoryRouter>
  </BookContext.Provider>
);

describe("Book Overview Component with mocked http responses", () => {
  beforeAll(() => {
    jest.spyOn(window, "fetch");
    jest.spyOn(console, "error").mockImplementation(() => {});
  });
  beforeEach(
    async () => await (window.fetch as any).mockImplementation(mockFetch),
  );

  it("renders spinner before books are loaded", () => {
    // given
    render(<BookOverview />, { wrapper: WrapperComponent });

    // when
    const spinner = screen.getByTestId("spinner");
    // then
    expect(spinner).toBeInTheDocument();
  });

  it("renders the master table having three columns", async () => {
    // given
    expect.hasAssertions();
    render(<BookOverview />, { wrapper: WrapperComponent });

    // when
    const noColumn = await screen.findByText(/#/i);
    const authorsColumn = await screen.findByText(/Authors/i);
    const titleColumn = await screen.findByText(/Title/i);
    // then
    expect(noColumn).toBeInTheDocument();
    expect(authorsColumn).toBeInTheDocument();
    expect(titleColumn).toBeInTheDocument();
  });
  it("Renders books table with data received from server", async () => {
    // given
    expect.hasAssertions();

    render(<BookOverview />, { wrapper: WrapperComponent });
    expect(await screen.findByText(/Julius Verne/i)).toBeInTheDocument();
    expect(await screen.findByText(/Frank Herbert/i)).toBeInTheDocument();
  });

  it("change path after row click", async () => {
    // given
    render(<BookOverview />, { wrapper: WrapperComponent });
    // when
    const authorCell = await screen.findByText(/Julius Verne/i);
    const row = authorCell.closest("tr");
    row && userEvent.click(row);
    // then
    expect(await screen.findByTestId("book-details-form")).toBeVisible();
  });
});
