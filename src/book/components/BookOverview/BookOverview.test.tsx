import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { BookOverview } from "./BookOverview";
import { BookContext, getURI, useBooks } from "../../services/BooksService";
import { Book } from "../../book";
import userEvent from "@testing-library/user-event";
import { BookDetails } from "../BookDetails/BookDetails";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

const mockedResponseBooks: Book[] = [
  {
    id: "1",
    authors: "Julius Verne",
    title: "80 days around the world",
  },
  {
    id: "2",
    authors: "Frank Herbert",
    title: "Dune",
  },
];

const server = setupServer(
  http.get(getURI("books"), () => {
    return HttpResponse.json(mockedResponseBooks);
  }),
  http.get(getURI(`books/${mockedResponseBooks[0].id}`), () => {
    return HttpResponse.json(mockedResponseBooks[0]);
  }),
  http.put(
    getURI(`books/${mockedResponseBooks[0].id}`),
    async ({ request }) => {
      const body = await request.json();
      return HttpResponse.json(body);
    },
  ),
);

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
    server.listen();
  });

  afterAll(() => {
    server.close();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  it("renders spinner before books are loaded", async () => {
    // given
    render(<BookOverview />, { wrapper: WrapperComponent });

    // when
    const spinner = screen.getByTestId("spinner");
    // then
    expect(screen.queryByText("Julius Verne")).toBeNull();
    expect(spinner).toBeInTheDocument();

    expect(await screen.findByText("Julius Verne")).toBeInTheDocument();
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
    row && (await userEvent.click(row));
    // then
    expect(await screen.findByLabelText(/Authors/i)).toBeInTheDocument();
  });
});
