import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { BookOverview } from "./BookOverview";
import {
  BookContext,
  BookProvider,
  getURI,
  useBooks,
} from "../../services/BooksService";
import { Book } from "../../book";
import userEvent from "@testing-library/user-event";
import { LoaderProvider } from "../../services/LoaderService";

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

const mockFetch = async function mockFetch(
  url: string,
  config: Record<string, any>,
) {
  switch (url) {
    case getURI("books"): {
      return {
        ok: true,
        json: async () => mockedResponseBooks,
      };
    }
    default: {
      throw new Error(`Unhandled request: ${url}`);
    }
  }
};

const WrapperComponent = ({ children }: any) => (
  <LoaderProvider>
    <BookProvider>
      <MemoryRouter>
        <Routes>
          <Route path="/" element={children} />
          <Route
            path="/book-app/book/1"
            element={<div>Book Details Component</div>}
          />
        </Routes>
      </MemoryRouter>
    </BookProvider>
  </LoaderProvider>
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
    expect.hasAssertions();
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

    //then
    expect(await screen.findByText(/Julius Verne/i)).toBeInTheDocument();
    expect(await screen.findByText(/Frank Herbert/i)).toBeInTheDocument();
  });
  it("change path after row click", async () => {
    // given
    expect.hasAssertions();
    render(<BookOverview />, { wrapper: WrapperComponent });
    // when
    const row = (await screen.findByText(/Julius Verne/i)).closest("tr");
    row && userEvent.click(row);
    // then
    expect(screen.getByText(/Book Details Component/i)).toBeVisible();
  });
});
